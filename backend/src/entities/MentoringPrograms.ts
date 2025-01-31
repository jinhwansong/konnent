import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MentorProfile } from './MentorProfile';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Reservations } from './Reservations';
import { AvailableSchedule } from './AvailableSchedule';
import { ExceptionsSchedule } from './ExceptionsSchedule';

// 프로그램 활성화
export enum ProgramStatus {
  ACTIVE = 'active',
  INACTIVITY = 'inactivity',
}

@Entity({ schema: 'konnect', name: 'mentoringprograms' })
export class MentoringPrograms {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 멘토링 제목
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '실무자와 함께하는 마케팅 기초',
    description: '멘토링 제목',
    required: true,
  })
  @Column('varchar', { name: 'title', length: 100 })
  title: string;
  // 멘토링 내용
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '마케팅의 기초부터 실무에서 사용하는 전략까지...',
    description: '멘토링 내용',
    required: true,
  })
  @Column('text', { name: 'content' })
  content: string;
  // 멘토링 가격
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '30000',
    description: '멘토링비용',
    required: true,
  })
  @Column('int', { name: 'price' })
  price: number;
  // 1회당 멘토링 가능 시간
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: '60',
    description: '1회당 멘토링 시간 (분 단위)',
    required: true,
  })
  @Column('int', { name: 'duration' })
  duration: number;
  // 평균평점
  @IsNumber()
  @ApiProperty({
    example: 4.5,
    description: '프로그램 평균 평점 (0-5점)',
    minimum: 0,
    maximum: 5,
    default: 0,
  })
  @Column('decimal', {
    name: 'averageRating',
    precision: 2,
    scale: 1,
    default: 0,
  })
  averageRating: number;
  // 총 평가 수
  @IsNumber()
  @ApiProperty({
    example: 42,
    description: '총 평가 수',
    default: 0,
  })
  @Column('int', {
    name: 'totalRatings',
    default: 0,
  })
  totalRatings: number;
  // 프로그램 상태
  @ApiProperty({
    example: ProgramStatus.ACTIVE,
    description: '프로그램 상태',
    enum: ProgramStatus,
  })
  @Column('enum', {
    name: 'status',
    enum: ProgramStatus,
    default: ProgramStatus.ACTIVE,
  })
  status: ProgramStatus;
  @Column({ name: 'profileId' })
  profileId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // 멘토프로필과의 관계설정
  @ManyToOne(() => MentorProfile, (profile) => profile.programs)
  @JoinColumn({ name: 'profileId' })
  profile: MentorProfile;
  // 예약일정 관계설정
  @OneToMany(() => Reservations, (reservation) => reservation.programs)
  reservations: Reservations[];
  // 예약 가능
  @OneToOne(() => AvailableSchedule, (schedule) => schedule.programs)
  available: AvailableSchedule;
}
