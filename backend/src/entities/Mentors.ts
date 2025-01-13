import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './Users';
import { Status } from '../common/enum/status.enum';
import { MentorProfile } from './MentorProfile';

@Entity({ schema: 'konnect', name: 'mentors' })
export class Mentors {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 이메일
  @Column('varchar', { name: 'email', length: 30 })
  email: string;
  // 멘토링희망분야
  @Column('varchar', { name: 'job' })
  job: string;
  // 멘토 경력
  @Column('varchar', { name: 'career' })
  career: string;
  // 멘토자기소개
  @Column('text', { name: 'introduce' })
  introduce: string;
  // 멘토포트폴리오
  @Column('varchar', { name: 'portfolio' })
  portfolio: string;
  // 통과여부
  @Column('enum', { name: 'status', enum: Status, default: Status.PENDING })
  status: Status;
  // 거절사유
  @Column('text', { name: 'reason', nullable: true })
  reason: string | null;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // 멘토프로필
  @OneToOne(() => MentorProfile, (profile) => profile.mentor)
  profile: MentorProfile;
  // 유저와 관계 설정
  @OneToOne(() => Users, (user) => user.mentors)
  @JoinColumn({ name: 'userId' })
  users: Users;
}
