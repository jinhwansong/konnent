import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mentors } from './Mentors';
import { Payments } from './Payments';

@Entity({ schema: 'konnect', name: 'mentoringprograms' })
export class MentoringPrograms {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 멘토링 제목
  @Column('varchar', { name: 'title', length: 100 })
  title: string;
  // 멘토링 내용
  @Column('text', { name: 'content' })
  content: string;
  // 멘토링 가격
  @Column('int', { name: 'price' })
  price: number;
  // 멘토링 가능날짜
  @Column('json', { name: 'date' })
  data: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // 멘토신청과의 관계설정
  @ManyToOne(() => Mentors, (Mentor) => Mentor.MentoringPrograms)
  Mentors: Mentors;
  // 결제 관계설정
  @OneToMany(() => Payments, (payment) => payment.MentoringPrograms)
  payments: Payments[];
}
