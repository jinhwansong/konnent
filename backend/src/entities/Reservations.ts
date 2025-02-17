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
import { AvailableSchedule } from './AvailableSchedule';
import { Contact } from './Contact';
import { IsDateString, IsNotEmpty } from 'class-validator';

// 멘토링 현황
export enum MemtoringStatus {
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
  // 예약된 시간
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2022-01-01 09:00:00',
    description: '멘토링 시작 시간',
  })
  @Column('datetime')
  startTime: Date;
  // 예약 종료된 시간
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2022-01-01 10:00:00',
    description: '멘토링 종료 시간',
  })
  @Column('datetime')
  endTime: Date;
  @Column()
  programsId: number;
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
  @Column()
  userId: number;
  @Column()
  scheduleId: number;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  // 결제 관계설정
  @OneToOne(() => Payments, (payment) => payment.reservation)
  payment: Payments;
  // 프로그램과 관계설정
  @ManyToOne(() => MentoringPrograms, (program) => program.reservations)
  programs: MentoringPrograms;
  // 유저와의 관계
  @ManyToOne(() => Users, (user) => user.reservations)
  user: Users;
  // 예약가능한시간 관계설정
  @ManyToOne(() => AvailableSchedule, (schedule) => schedule.reservation)
  @JoinColumn({ name: 'scheduleId' })
  schedule: AvailableSchedule;
  // 연락처
  @OneToOne(() => Contact, (contact) => contact.reservation, {
    cascade: true,
  })
  contact: Contact;
}
