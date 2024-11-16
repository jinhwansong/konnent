import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/common/enum/status.enum';
import { Mentos } from 'src/entities/Mentos';
import { UserRole, Users } from 'src/entities/Users';
import { DataSource, In, Repository } from 'typeorm';

@Injectable()
export class MentoService {
  // 테이블과 엔티티 이어주기.
  constructor(
    @InjectRepository(Mentos)
    private mentoRepository: Repository<Mentos>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private dataSource: DataSource,
  ) {}
  // 멘토신청
  async mentorApplication(
    userId: number,
    email: string,
    job: string,
    introduce: string,
    portfolio: string,
    career: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    // db 연결
    await queryRunner.connect();
    // 트랜잭션 시작
    await queryRunner.startTransaction();
    if (!email) {
      throw new BadRequestException('이메일을 작성해주세요');
    }
    if (!job) {
      throw new BadRequestException('희망분야를 선택해주세요');
    }
    if (!introduce) {
      throw new BadRequestException('멘토님의 소개를입력해주세요');
    }
    if (!portfolio) {
      throw new BadRequestException('포트폴리오 링크를 입력해주세요');
    }
    if (!career) {
      throw new BadRequestException('멘토님의 경력을 선택해주세요');
    }
    try {
      // 멘토인지 아닌지 여부
      const mentor = await queryRunner.manager.getRepository(Mentos).findOne({
        where: {
          users: { id: userId },
          status: In([Status.PENDING, Status.APPROVED]),
        },
        order: { createdAt: 'DESC' },
      });
      if (mentor) {
        if (mentor.status === Status.PENDING) {
          throw new BadRequestException('이미 멘토 신청을 하셨습니다');
        }
        if (mentor.status === Status.APPROVED) {
          throw new BadRequestException('이미 승인된 멘토입니다.');
        }
      }
      // 떨어졋을시 재 신청기간
      const rejected = await queryRunner.manager.getRepository(Mentos).findOne({
        where: {
          users: { id: userId },
          status: In([Status.REJECTED]),
        },
        order: { createdAt: 'DESC' },
      });
      // 3일후 신청가능
      if (rejected) {
        const days = 3;
        const canDate = new Date(rejected.updatedAt);
        canDate.setDate(canDate.getDate() + days);
        if (new Date() < canDate) {
          throw new BadRequestException(
            `재신청은 거절 후 ${days}일 이후에 가능합니다.` +
              `재신청 가능일은 : ${canDate.toLocaleDateString()}`,
          );
        }
      }
      await queryRunner.manager.getRepository(Mentos).save({
        email,
        job,
        introduce,
        portfolio,
        career,
        users: { id: userId },
        status: Status.PENDING,
      });
      await queryRunner.commitTransaction();
      return { message: '멘토신청이 완료되었습니다.' };
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  // 멘토 승인/거절
  async approveMentor(mentoId: number, approved: boolean, reason?: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const mentor = await queryRunner.manager.getRepository(Mentos).findOne({
        where: { id: mentoId },
        relations: ['users'],
        select: ['id', 'status', 'users'],
      });
      if (!mentor) {
        throw new BadRequestException('멘토 신청 정보를 찾을 수 없습니다.');
      }
      if (mentor.status !== Status.PENDING) {
        throw new BadRequestException('이미 처리된 멘토 신청입니다.');
      }
      // 멘토 신청 상태 업데이트
      await queryRunner.manager.update(
        Mentos,
        { id: mentoId },
        {
          status: approved ? Status.APPROVED : Status.REJECTED,
          reason: !approved ? reason : null,
        },
      );
      // 유저 등급 변경
      if (approved) {
        await queryRunner.manager.update(
          Users,
          { id: mentor.users.id },
          { role: UserRole.MENTOR },
        );
      }
      await queryRunner.commitTransaction();
      return {
        message: approved
          ? '멘토 승인이 완료되었습니다.'
          : '멘토 신청을 거절되었습니다.',
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        '멘토 승인/거절 처리 중 오류가 발생했습니다.',
      );
    } finally {
      await queryRunner.release();
    }
  }

  // 멘토 신청목록
  async getApplications(pages: number = 1, limit: number = 10) {
    try {
      const queryBuilder = this.mentoRepository
        .createQueryBuilder('mento')
        .leftJoinAndSelect('mento.user', 'user') // user 테이블과 조인
        .select([
          'mento.id',
          'user.name',
          'mento.job',
          'mento.career',
          'mento.status',
          'mento.createdAt',
        ])
        .orderBy('mento.createdAt', 'DESC');

      // 페이지 네이션 적용
      const skip = (pages - 1) * limit;
      queryBuilder.skip(skip).take(limit);

      // 데이터와 전체 개수 조회
      const [page, total] = await queryBuilder.getManyAndCount();
      return {
        page,
        totalPage: Math.ceil(total / limit),
        message: '멘토 신청 목록을 조회했습니다.',
      };
    } catch (error) {
      throw new InternalServerErrorException(
        '멘토 신청 목록 조회 중 오류가 발생했습니다.',
      );
    }
  }
  // 멘토 신청 상세페이지
  async findOneApplicationDetail(id: number) {
    try {
      const mento = await this.mentoRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!mento) {
        throw new BadRequestException(
          '조회하신 멘토 신청 정보를 찾을 수 없습니다.',
        );
      }
      return {
        id: mento.id,
        name: mento.users.name,
        email: mento.email,
        job: mento.job,
        career: mento.career,
        introduce: mento.introduce,
        portfolio: mento.portfolio,
        status: mento.status,
        createdAt: mento.createdAt,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        '멘토 신청 상세 정보 조회 중 오류가 발생했습니다.',
      );
    }
  }
}
