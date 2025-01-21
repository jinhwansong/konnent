import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MentoringPrograms } from './MentoringPrograms';

// 멘토링 예외일정
enum Exceptions {
  HOLIDAY = 'holiday',
  SPECIAL = 'special',
  UNAVAILABLE = 'unavailable',
}

@Entity({ schema: 'konnect', name: 'exceptionsschedule' })
export class ExceptionsSchedule {
  // 키값
  @ApiProperty({ example: 1, description: 'id', required: true })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 예외 날짜
  @Column('date')
  exceptionDate: Date;
  // 예외 사유
  @Column('enum', {
    name: 'type',
    enum: Exceptions,
    default: Exceptions.UNAVAILABLE,
  })
  type: Exceptions;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 프로그램과 관계설정
  @ManyToOne(() => MentoringPrograms, (program) => program.exception)
  programs: MentoringPrograms;
}
