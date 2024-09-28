import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Likes } from './Likes';
import { Mentos } from './Mentos';
import { Comments } from './Comments';
import { Payments } from './Payments';

// 회원등급
export enum UserRole {
  USER = 'user',
  MENTOR = 'mentor',
  ADMIN = 'admin',
}
// 소셜로그인
export enum SocialLoginProvider {
  GOOGLE = 'google',
  KAKAO = 'kakao',
  NAVER = 'naver',
  LOCAL = 'local',
}
@Entity({ schema: 'konnect', name: 'users' })
export class Users {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 이메일
  @Column('varchar', {
    name: 'email',
    length: 30,
    unique: true,
    nullable: true,
  })
  email: string;
  // 비밀번호
  @Column('varchar', { name: 'password', length: 100, nullable: true })
  password: string | null;
  //닉네임
  @Column('varchar', { name: 'nickname', length: 30, unique: true })
  nickname: string;
  // 이름
  @Column('varchar', { name: 'name', length: 30 })
  name: string;
  // 전화번호
  @Column('varchar', { name: 'phone', length: 11, unique: true })
  phone: number;
  // 프로필이미지
  @Column('varchar', { name: 'image', length: 200, nullable: true })
  image: string;
  // 소셜로그인
  // 일반회원일수 잇기때문에 null로 설정
  @Column('enum', {
    enum: SocialLoginProvider,
    nullable: true,
    default: SocialLoginProvider.LOCAL,
  })
  socialLoginProvider: SocialLoginProvider | null;
  // snsid
  @Column('varchar', { name: 'snsid', nullable: true })
  // 유저등급
  @Column('enum', { enum: UserRole, default: UserRole.USER })
  role: UserRole;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @DeleteDateColumn()
  deleteAt: Date;
  // 멘토 신청 관계설정
  @OneToOne(() => Mentos, (mento) => mento.users)
  mentos: Mentos;
  // 게시물 댓글 관계설정
  @OneToMany(() => Comments, (Comment) => Comment.users)
  comments: Comments[];
  // 게시물 좋아요
  @OneToMany(() => Likes, (like) => like.users)
  likes: Likes[];
  // 결제 관계설정
  @OneToMany(() => Payments, (payment) => payment.users)
  payments: Payments[];
}
