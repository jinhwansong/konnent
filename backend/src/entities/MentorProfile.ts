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
import { IsBase64, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Mentors } from './Mentors';

@Entity({ schema: 'konnect', name: 'mentor_profile' })
export class MentorProfile {
  // 키값
  @ApiProperty({ example: 1, description: 'id', required: true })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 멘토 회사정보
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '네카라쿠베',
    description: '회사정보',
    required: true,
  })
  @Column('varchar', { name: 'company' })
  company: string;
  // 멘토자기소개
  @IsString()
  @MaxLength(3000)
  @IsNotEmpty()
  @ApiProperty({
    example:
      '"저는 프론트엔드 개발자로 5년간 일해왔으며, 이제 후배 개발자들에게 저의 경험을 나누고 싶습니다."',
    description: '자기소개',
    required: true,
  })
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
