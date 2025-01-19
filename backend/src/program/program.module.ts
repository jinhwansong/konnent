import { Module } from '@nestjs/common';
import { ProgramService } from './program.service';
import { ProgramController } from './program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';
import { Mentors } from 'src/entities/Mentors';

@Module({
  imports: [TypeOrmModule.forFeature([Mentors, MentoringPrograms])],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
