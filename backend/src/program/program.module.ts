import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';
import { MentorProfile } from 'src/entities/MentorProfile';
import { AvailableSchedule } from 'src/entities/AvailableSchedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MentorProfile,
      MentoringPrograms,
      AvailableSchedule,
    ]),
  ],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
