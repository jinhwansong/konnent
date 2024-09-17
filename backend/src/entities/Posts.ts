import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Likes } from './Likes';
import { Mentos } from './Mentos';
import { Comments } from './Comments';

@Entity({ schema: 'konnect', name: 'posts' })
export class Posts {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;
  // 게시물 제목
  @Column('varchar', { name: 'title', length: 100 })
  title: string;
  // 게시물 내용
  @Column('varchar', { name: 'content' })
  content: string;
  // 좋아요와 관계설정
  @OneToMany(() => Likes, (likes) => likes.posts)
  likes: Likes[];
  // 댓글과 관계설정
  @OneToMany(() => Comments, (comment) => comment.posts)
  comments: Comments[];
  // 멘토과 관계설정
  @ManyToOne(() => Mentos, (mento) => mento.posts)
  mentos: Mentos[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
