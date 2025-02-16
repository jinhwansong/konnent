import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  CreateReservationDto,
  PaymentVerificationDto,
} from './dto/create-reservation.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.Interceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('프로그램 예약')
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '프로그램 예약' })
  @ApiResponse({
    status: 200,
    description: '프로그램이 예약완료 되었습니다.',
    type: CreateReservationDto,
  })
  @ApiResponse({
    status: 500,
    description: '프로그램 예약 중 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: {
          type: 'string',
          example: '프로그램 예약 중 오류가 발생했습니다.',
        },
      },
    },
  })
  @Post()
  create(@Body() createReservationDto: CreateReservationDto, @User() user) {
    return this.reservationService.create(createReservationDto, user.id);
  }
  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '프로그램 예약 결제검증' })
  @ApiResponse({
    status: 200,
    description: '프로그램이 예약 결제 검증이 완료 되었습니다.',
    type: PaymentVerificationDto,
  })
  @ApiResponse({
    status: 500,
    description: '프로그램 예약 결제 중 오류가 발생했습니다.',
    schema: {
      properties: {
        statusCode: { type: 'number', example: 500 },
        message: {
          type: 'string',
          example: '프로그램 예약 결제 중 오류가 발생했습니다.',
        },
      },
    },
  })
  @Post('verify')
  verifyPayment(@Body() PaymentVerificationDto: PaymentVerificationDto) {
    return this.reservationService.verifyPayment(PaymentVerificationDto);
  }
}
