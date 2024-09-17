import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './Users';
import { Posts } from './Posts';
import { MentoringPrograms } from './MentoringPrograms';
import { Status } from '../common/enum/status.enum';

@Entity({ schema: 'konnect', name: 'mentos' })
export class Mentos {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 멘토직무
  @Column('varchar', { name: 'office', length: 30 })
  office: string;
  // 현재직업
  @Column('varchar', { name: 'currentJob', length: 30 })
  currentJob: string;
  // 멘토링희망분야
  @Column('varchar', { name: 'desiredField', length: 20 })
  desiredField: string;
  // 멘토 경력
  @Column('int', { name: 'years' })
  years: number;

  // 멘토자기소개
  @Column('text', { name: 'introduce' })
  introduce: string;
  // 멘토포트폴리오
  @Column('varchar', { name: 'link' })
  link: string;
  // 통과여부
  @Column('enum', { name: 'statue', enum: Status, default: Status.PENDING })
  status: Status;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  // 유저와 관계 설정
  @OneToOne(() => Users, (user) => user.mentos)
  @JoinColumn()
  users: Users;
  // 멘토링 프로그램과의 관계설정
  @OneToMany(() => MentoringPrograms, (program) => program.mentos)
  mentoringPrograms: MentoringPrograms[];
  // 게시물과의 관계설정
  @OneToMany(() => Posts, (post) => post.mentos)
  posts: Posts[];
}
