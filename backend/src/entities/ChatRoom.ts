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
import { ChatMember } from './ChatMember';
import { ApiProperty } from '@nestjs/swagger';
import { Reservations } from './Reservations';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity({ schema: 'konnect', name: 'chatroom' })
export class ChatRoom {
  // 키값
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  @ApiProperty({
    example: '웹 프론트엔드 멘토링 채팅',
    description: '채팅방 이름',
  })
  @IsNotEmpty()
  @Column()
  name: string;
  @ApiProperty({
    example: 42,
    description: '연결된 예약 ID',
  })
  @IsNotEmpty()
  @IsNumber()
  @Column()
  chatRoomId: number;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  // 예약 관계설정
  @OneToOne(() => Reservations, (reservations) => reservations.room)
  @JoinColumn({ name: 'chatRoomId' })
  reservations: Reservations;
  // 채팅방 관계설정
  @OneToMany(() => ChatMember, (member) => member.room)
  chatmember: ChatMember[];
}
