import { Module } from '@nestjs/common';
import { MentorController } from './mentor.controller';
import { MentorService } from './mentor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentors } from 'src/entities/Mentors';
import { Users } from 'src/entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Mentors, Users])],
  controllers: [MentorController],
  providers: [MentorService],
})
export class MentorModule {}
