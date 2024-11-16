import { Module } from '@nestjs/common';
import { MentoController } from './mento.controller';
import { MentoService } from './mento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentos } from 'src/entities/Mentos';
import { Users } from 'src/entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Mentos, Users])],
  controllers: [MentoController],
  providers: [MentoService],
})
export class MentoModule {}
