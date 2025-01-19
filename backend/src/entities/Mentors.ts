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
import { Status } from '../common/enum/status.enum';
import { MentorProfile } from './MentorProfile';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ExceptionsSchedule } from './ExceptionsSchedule';
import { AvailableSchedule } from './AvailableSchedule';

@Entity({ schema: 'konnect', name: 'mentors' })
export class Mentors {
  // 키값
  @ApiProperty({ example: 1, description: 'id', required: true })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 이메일
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@gmail.com',
    description: '연락받을 이메일 주소',
    required: true,
  })
  @Column('varchar', {
    name: 'email',
    length: 30,
    unique: true,
    nullable: true,
  })
  email: string;
  // 멘토링희망분야
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '데이터사이언스',
    description: '멘토링 희망분야',
    required: true,
  })
  @Column('varchar', { name: 'job' })
  job: string;
  // 멘토 경력
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '주니어(1~3년)',
    description: '경력',
    required: true,
  })
  @Column('varchar', { name: 'career' })
  career: string;
  // 멘토자기소개
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example:
      '"저는 프론트엔드 개발자로 5년간 일해왔으며, 이제 후배 개발자들에게 저의 경험을 나누고 싶습니다."',
    description: '자기소개',
    required: true,
  })
  @Column('text', { name: 'introduce' })
  introduce: string;
  // 멘토포트폴리오
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'example@gmail.com',
    description: '포트폴리오 페이지',
    required: true,
  })
  @Column('varchar', { name: 'portfolio' })
  portfolio: string;
  // 통과여부
  @ApiProperty({
    example: true,
    description: '승인 여부',
  })
  @IsBoolean()
  @Column('enum', { name: 'status', enum: Status, default: Status.PENDING })
  status: Status;
  // 거절사유
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '자격요건 미달',
    description: '거절 사유 (거절시에만 필요)',
    required: false,
  })
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
  @OneToOne(() => Users, (user) => user.mentor)
  @JoinColumn({ name: 'userId' })
  user: Users;
  // 불가능한 스케줄
  @OneToMany(() => ExceptionsSchedule, (exception) => exception.mentor)
  exception: ExceptionsSchedule[];
  // 가능한 스케줄
  @OneToMany(() => AvailableSchedule, (available) => available.mentor)
  available: AvailableSchedule[];
}
