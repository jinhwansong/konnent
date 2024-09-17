import { Module } from '@nestjs/common';
import { MentoController } from './mento.controller';
import { MentoService } from './mento.service';

@Module({
  controllers: [MentoController],
  providers: [MentoService],
})
export class MentoModule {}
