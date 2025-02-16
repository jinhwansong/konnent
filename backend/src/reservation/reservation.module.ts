import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservations } from 'src/entities/Reservations';
import { MentoringPrograms } from 'src/entities/MentoringPrograms';
import { AvailableSchedule } from 'src/entities/AvailableSchedule';
import { Contact } from 'src/entities/Contact';
import { Payments } from 'src/entities/Payments';
import { PaymentsService } from 'src/payments/payments.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservations,
      MentoringPrograms,
      AvailableSchedule,
      Contact,
      Payments,
    ]),
    HttpModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService, PaymentsService],
})
export class ReservationModule {}
