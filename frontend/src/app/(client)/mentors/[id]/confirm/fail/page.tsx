'use client';
import { useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useToastStore } from '@/stores/useToast';
import { useReservation } from '@/stores/useReservation';

export default function FailPage() {
  const searchParams = useSearchParams();
  const { sessionId } = useParams<{ sessionId: string }>();

  const router = useRouter();
  const { showToast } = useToastStore();
  const { reservation } = useReservation();
  const hasDraft = Boolean(reservation && reservation.timeSlot?.startTime);
  useEffect(() => {
    const code = searchParams.get('code');
    const message = searchParams.get('message');

    if (code === 'USER_CANCEL') {
      showToast('사용자가 결제를 취소했습니다.', 'error');
    } else {
      showToast(`결제 실패${message ? `: ${message}` : ''}`, 'error');
    }

    const next = hasDraft
      ? `/mentors/${sessionId}/confirm`
      : `/mentors/${sessionId}/reserve`;

    router.replace(next);
  }, [searchParams, router, sessionId, showToast, hasDraft]);

  return null;
}
