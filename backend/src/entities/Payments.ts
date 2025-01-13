import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './Users';
import { MentoringPrograms } from './MentoringPrograms';
import { Status } from '../common/enum/status.enum';

@Entity({ schema: 'konnect', name: 'payments' })
export class Payments {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 가격
  @Column('int', { name: 'price' })
  price: number;
  // 결제상태
  @Column('enum', { name: 'status', enum: Status, default: Status.PENDING })
  status: Status;
  // 결제 고유 아이디
  @Column('varchar', { name: 'transactionId', length: 100, nullable: true })
  transactionId: string;
  // 결제 방식
  @Column('varchar', { name: 'paymentType', length: 20 })
  paymentType: string;
  // 환불 정보
  @Column('boolean', { name: 'refuded', default: false })
  refuded: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // 유저과의 관계
  @ManyToOne(() => Users, (user) => user.payments)
  users: Users;
  // 멘토과의 관계
  @ManyToOne(() => MentoringPrograms, (programs) => programs.payments)
  MentoringPrograms: MentoringPrograms;
}
