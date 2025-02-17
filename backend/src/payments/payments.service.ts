import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PaymentVerificationDto } from 'src/reservation/dto/create-reservation.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly httpService: HttpService) {}
  private readonly TOSS_SECRET_KEY = process.env.TOSS_SECRET;
  // 결제 승인 요청
  async comfirmPayment(body: PaymentVerificationDto) {
    const encryptedSecretKey =
      'Basic ' + Buffer.from(this.TOSS_SECRET_KEY + ':').toString('base64');
    const response = await this.httpService
      .post(
        'https://api.tosspayments.com/v1/payments/confirm',
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
      )
      .toPromise();
    console.log('Raw Response:', response);
    // 명시적으로 상태 확인
    if (response?.data?.status === 'DONE') {
      console.log('결제 성공:', response.data);
      return response.data;
    } else {
      throw new BadRequestException('결제 상태가 완료되지 않았습니다.');
    }
    // try {
    // } catch (error) {
    //   console.error('결제 확인 중 오류:', {
    //     message: error.message,
    //     response: error.response?.data,
    //     status: error.response?.status,
    //   });
    //   if (error.response) {
    //     throw new BadRequestException('결제 확인에 실패했습니다');
    //   }
    // }
  }
}
