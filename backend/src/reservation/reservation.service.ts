import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DataSource,
  Repository,
  Not,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import {
  CreateReservationDto,
  PaymentVerificationDto,
} from './dto/create-reservation.dto';
import { MemtoringStatus, Reservations } from 'src/entities/Reservations';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';
import { weeklyScheduleDto } from 'src/common/dto/time.dto';
import { Payments, PaymentStatus } from 'src/entities/Payments';
import { PaymentsService } from 'src/payments/payments.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservations)
    private readonly reservationRepository: Repository<Reservations>,
    @InjectRepository(MentoringPrograms)
    private readonly programsRepository: Repository<MentoringPrograms>,
    @InjectRepository(Payments)
    private readonly paymentsRepository: Repository<Payments>,
    private readonly tossPaymentService: PaymentsService,
    private readonly dataSource: DataSource,
  ) {}
  async create(body: CreateReservationDto, id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 프로그램 유무 스케줄 정보 조회
      const program = await queryRunner.manager
        .createQueryBuilder(MentoringPrograms, 'program')
        .leftJoinAndSelect('program.available', 'schedule')
        .where('program.id = :programId', { programId: body.programsId })
        .getOne();
      if (!program) {
        throw new BadRequestException('해당 프로그램이 존재하지 않습니다.');
      }
      if (!program.available) {
        throw new BadRequestException('스케줄 정보를 찾을 수 없습니다.');
      }
      // 멘토 가능시간?
      const availableTime = this.checkTime(
        program.available.available_schedule,
        body.startTime,
        body.endTime,
      );
      if (!availableTime) {
        throw new BadRequestException('선택한 시간에는 예약이 불가능합니다.');
      }
      // 예약 되있어?
      const exReservation = await queryRunner.manager.findOne(Reservations, {
        where: [
          {
            programsId: body.programsId,
            endTime: MoreThanOrEqual(body.startTime),
            startTime: LessThanOrEqual(body.endTime),
            status: Not(MemtoringStatus.CANCELLED),
          },
        ],
      });
      if (exReservation) {
        throw new BadRequestException('이미 예약된 시간입니다.');
      }
      // 예약 및 연락처 저장
      const reservation = queryRunner.manager.create(Reservations, {
        startTime: body.startTime,
        endTime: body.endTime,
        programsId: body.programsId,
        status: MemtoringStatus.PENDING,
        userId: id,
        contact: {
          email: body.email,
          phone: body.phone,
          message: body.message,
        },
      });
      await queryRunner.manager.save(reservation);
      // 결제 정보
      const payment = queryRunner.manager.create(Payments, {
        orderId: reservation.id,
        status: PaymentStatus.PENDING,
        price: program.price,
        title: program.title,
      });
      await queryRunner.manager.save(payment);
      await queryRunner.commitTransaction();
      return {
        message: '예약이 완료되었습니다.',
        amount: program.price,
        orderId: `MENTOR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        orderName: program.title,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  private checkTime(
    schedule: weeklyScheduleDto,
    startTime: Date,
    endTime: Date,
  ): boolean {
    // 시작시간의 요일 숫자로 가져옴
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    const datOfWeek = startDate.getDay();
    // 요일 문자열
    const days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    // schedule[days[0 ... ]] 이런식으로 요일별 가능시간대 가져옴
    const daySchedule = schedule[days[datOfWeek]];
    // 분으로 변환
    const start = startDate.getUTCHours() * 60 + startDate.getUTCMinutes();
    const end = endDate.getUTCHours() * 60 + endDate.getUTCMinutes();
    // 시간대 검사
    return daySchedule.some((slot) => {
      const [slotStartHour, slotStartMin] = slot.startTime
        .split(':')
        .map(Number);
      const [slotEndHour, slotEndMin] = slot.endTime.split(':').map(Number);
      const slotStart = slotStartHour * 60 + slotStartMin;
      const slotEnd = slotEndHour * 60 + slotEndMin;
      return start >= slotStart && end <= slotEnd;
    });
  }
  // 결제 검증
  async verifyPayment(body: PaymentVerificationDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // 결제 정보 조회
      const payment = await queryRunner.manager.findOne(Payments, {
        where: { orderId: body.orderId },
      });
      if (!payment) {
        throw new BadRequestException('결제 정보를 찾을 수 없습니다.');
      }
      // 금액 검증
      if (payment.price !== body.orderId) {
        throw new BadRequestException('결제 금액이 일치 하지 않습니다.');
      }
      // 토스 결제 승인 요청
      await this.tossPaymentService.comfirmPayment(body);
      // 정보 업데이트
      payment.paymentKey = body.paymentKey;
      payment.status = PaymentStatus.COMPLETED;
      payment.paidAt = new Date();
      await queryRunner.manager.save(payment);
      // 예약 상태 업데이트
      await queryRunner.manager.update(
        Reservations,
        { id: body.orderId },
        { status: MemtoringStatus.COMFIRMED },
      );
      await queryRunner.commitTransaction();
      return payment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
