import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PaymentVerificationDto } from 'src/reservation/dto/create-reservation.dto';

@Injectable()
export class PaymentsService {
  constructor(
    // axios
    private readonly httpServce: HttpService,
  ) {}
  private readonly TOSS_SECRET_KEY = `${process.env.TOSS_SECRET}`;
  private readonly TOSS_URL =
    'https://api.tosspayments.com/v1/payments/confirm';
  // 결제 승인 요청
  async comfirmPayment(body: PaymentVerificationDto) {
    const encryptedSecretKey =
      'Basic ' + Buffer.from(this.TOSS_SECRET_KEY + ':').toString('base64');
    try {
      const data = await firstValueFrom(
        this.httpServce.post(
          `${this.TOSS_URL}`,
          {
            orderId: body.orderId,
            amount: body.price,
            paymentKey: body.paymentKey,
          },
          {
            headers: {
              Authorization: encryptedSecretKey,
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return data;
    } catch (error) {
      throw new BadRequestException('결제 승인 실패');
    }
  }
}
