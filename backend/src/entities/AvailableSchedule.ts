import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { weeklyScheduleDto } from 'src/common/dto/time.dto';
import { Mentors } from './Mentors';

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

  // 멘토와의 관계
  @ManyToOne(() => Mentors, (mentor) => mentor.available)
  mentor: Mentors;
}
