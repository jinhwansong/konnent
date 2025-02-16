import { IntersectionType, PickType } from '@nestjs/swagger';
import { Contact } from 'src/entities/Contact';
import { Payments } from 'src/entities/Payments';
import { Reservations } from 'src/entities/Reservations';

export class CreateReservationDto extends IntersectionType(
  PickType(Reservations, ['startTime', 'endTime', 'programsId']),
  PickType(Contact, ['phone', 'email', 'message']),
) {}

export class PaymentVerificationDto extends IntersectionType(
  PickType(Payments, ['paymentKey', 'orderId', 'price']),
) {}
