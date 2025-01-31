import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MentorProfile } from './MentorProfile';
import { ExceptionDateDto } from 'src/common/dto/time.dto';

@Entity({ schema: 'konnect', name: 'exceptionsschedule' })
export class ExceptionsSchedule {
  // 키값
  @ApiProperty({ example: 1, description: 'id', required: true })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 예외 날짜
  @Column('date')
  @ApiProperty({
    example: [
      { date: '2024-02-14', type: 'HOLIDAY' },
      { date: '2024-02-15', type: 'SPECIAL' },
      { date: '2024-02-16', type: 'UNAVAILABLE' },
    ],
    description: '멘토링 불가능한 날짜 리스트',
    required: true,
    type: () => ExceptionDateDto,
  })
  exceptionDate: ExceptionDateDto[];
  @Column({ name: 'profileId' })
  profileId: number;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 멘토 와의 관계설정
  @ManyToOne(() => MentorProfile, (profile) => profile.exSchedule)
  @JoinColumn({ name: 'profileId' })
  profile: MentorProfile;
}
