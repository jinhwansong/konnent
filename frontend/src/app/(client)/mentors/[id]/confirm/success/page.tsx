'use client';
import { useEffect } from 'react';
import { useToastStore } from '@/stores/useToast';
import { useRouter, useSearchParams } from 'next/navigation';
import { postPayment } from '@/libs/reservation';
import { useReservation } from '@/stores/useReservation';

export default function SuccessPage({ sessionId }: { sessionId: string }) {
  const { showToast } = useToastStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resetReservation } = useReservation();
  useEffect(() => {
    const orderId = searchParams.get('orderId');
    const paymentKey = searchParams.get('paymentKey');
    const amount = searchParams.get('amount');
    if (!orderId || !paymentKey || !amount) {
      showToast('결제 정보가 유효하지 않습니다.', 'error');
      router.replace(`/mentors/${sessionId}/confirm`);
      return;
    }
    const data = {
      orderId: orderId as string,
      paymentKey: paymentKey as string,
      price: Number(amount),
    };
    try {
      postPayment(data);
      showToast('결제가 완료되었어요. 예약이 확정되었습니다.', 'success');
      resetReservation();
      router.replace(`/mentors/done/${orderId}`);
    } catch {
      showToast('예약 확정에 실패했습니다.', 'error');
      router.replace(`/mentors/${sessionId}/confirm`);
    }
  }, [router, searchParams, sessionId, showToast, resetReservation]);
  return null;
}
