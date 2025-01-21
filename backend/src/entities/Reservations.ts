import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Payments } from './Payments';
import { MentoringPrograms } from './MentoringPrograms';
import { Users } from './Users';
import { weeklyScheduleDto } from '../common/dto/time.dto';

// 멘토링 현황
enum MemtoringStatus {
  PENDING = 'pending',
  COMFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}
@Entity({ schema: 'konnect', name: 'reservations' })
export class Reservations {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 멘토링 가능날짜
  @Column('json', { name: 'availableSchedule' })
  availableSchedule: weeklyScheduleDto;
  // 예약된 시간
  @Column('datetime')
  startTime: Date;
  // 예약 종료된 시간
  @Column('datetime')
  endTime: Date;
  // 멘토링 현황
  @ApiProperty({
    example: MemtoringStatus.PENDING,
    description: '멘토링 현황',
    enum: MemtoringStatus,
  })
  @Column('enum', {
    name: 'status',
    enum: MemtoringStatus,
    default: MemtoringStatus.PENDING,
  })
  status: MemtoringStatus;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  // 결제 관계설정
  @OneToOne(() => Payments, (payment) => payment.reservation)
  @JoinColumn({ name: 'paymentId' })
  payment: Payments;
  // 프로그램과 관계설정
  @ManyToOne(() => MentoringPrograms, (program) => program.reservations)
  programs: MentoringPrograms;
  // 유저와의 관계
  @ManyToOne(() => Users, (user) => user.reservations)
  user: Users;
}
