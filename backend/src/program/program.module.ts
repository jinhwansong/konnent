import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';
import { MentorProfile } from 'src/entities/MentorProfile';

@Module({
  imports: [TypeOrmModule.forFeature([MentorProfile, MentoringPrograms])],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
