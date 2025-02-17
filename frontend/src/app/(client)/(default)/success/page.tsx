'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { IcSuccess } from '@/asset';
import { useToastStore } from '@/store/useToastStore';
import style from './success.module.scss';
import Link from 'next/link';


export interface ISuccessPage {
  endTime: string;
  message: string;
  price: number;
  startTime: string;
  title: string;
  mentor: string;
}

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // 토스트 팝업
  const { showToast } = useToastStore((state) => state);
  const [serverdata, setServerDate] = useState<ISuccessPage | null>(null);
  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');
    const paymentKey = searchParams.get('paymentKey');
    if (orderId && amount && paymentKey) {
      const comfirmPayment = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/reservation/verify`,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId,
                price: Number(amount),
                paymentKey,
              }),
            }
          );
          const res = await response.json();
          console.log(res)
          setServerDate(res);
        } catch (error:any) {
          showToast(error.message, 'error');
        }
      };
      comfirmPayment();
    }
  }, [searchParams, router, showToast]);

  return (
    <div className={style.success}>
      <Image alt="결제 완료" src={IcSuccess} />
      <em>결제가 완료되었습니다.</em>
      <p>멘토링 서비스를 이용해주셔서 감사합니다!</p>
      <div className={style.link_wrap}>
        <Link href="/" className={style.home}>
          홈으로 돌아가기
        </Link>
        <Link href="/mentoring/payments" className={style.payment}>
          멘토링 예약 확인하기
        </Link>
      </div>
    </div>
  );
}
