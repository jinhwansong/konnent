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
import { Users } from './Users';
import { Reservations } from './Reservations';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

@Entity({ schema: 'konnect', name: 'payments' })
export class Payments {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @Column({ length: 64 })
  orderId: string;
  // 가격
  @Column('int')
  price: number;
  // 결제한 멘토링 이름
  @Column()
  title: string;
  // 토스 페이먼츠 결제 고유번호
  @Column({ nullable: true })
  paymentKey: string;
  // 결제시간
  @Column({ nullable: true })
  paidAt: Date;
  // 결제 상태
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;
  @Column()
  reservationId: number;
  @Column()
  userId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // 유저과의 관계
  @ManyToOne(() => Users, (user) => user.payments)
  @JoinColumn({ name: 'userId' })
  user: Users;
  // 멘토 예약과의 관계
  @OneToOne(() => Reservations, (reservations) => reservations.payment)
  @JoinColumn({ name: 'reservationId' })
  reservation: Reservations;
}
