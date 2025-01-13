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
import { MentoringPrograms } from './MentoringPrograms';
import { Posts } from './Posts';
import { IsBase64 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Mentors } from './Mentors';

@Entity({ schema: 'konnect', name: 'mentorprofile' })
export class MentorProfile {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 멘토 회사정보
  @Column('varchar', { name: 'company' })
  company: string;
  // 멘토자기소개
  @Column('text', { name: 'introduce' })
  introduce: string;
  // 프로필이미지
  @IsBase64()
  @ApiProperty({
    required: true,
    example:
      'https://fastly.picsum.photos/id/1062/200/300.jpg?hmac=e6D9R3lyQ0AtilxM2LGviSrodxvroxcpCRm2FdfNwZg',
    description: '유저프로필',
  })
  @Column('varchar', { name: 'image', length: 200, nullable: true })
  image: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // 멘토링 프로그램과의 관계설정
  @OneToMany(() => MentoringPrograms, (program) => program.profile)
  programs: MentoringPrograms[];
  // 게시물과의 관계설정
  @OneToMany(() => Posts, (post) => post.profile)
  posts: Posts[];
  // 멘토 엔티티
  @OneToOne(() => Mentors, (mentor) => mentor.profile)
  @JoinColumn({ name: 'mentorId' })
  mentor: Mentors;
}
