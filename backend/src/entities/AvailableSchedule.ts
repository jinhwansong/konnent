import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MentoringPrograms } from './MentoringPrograms';
import { weeklyScheduleDto } from '../common/dto/time.dto';

@Entity({ schema: 'konnect', name: 'availableschedule' })
export class AvailableSchedule {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 멘토링 가능날짜
  @Column('json', { name: 'available_schedule' })
  availableSchedule: weeklyScheduleDto;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  // 프로그램과 관계설정
  @ManyToOne(() => MentoringPrograms, (program) => program.available)
  programs: MentoringPrograms;
}
