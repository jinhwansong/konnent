'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import ScheduleForm from '@/components/my/ScheduleForm';
import { useToastStore } from '@/stores/useToast';
import { ScheduleRequest } from '@/types/schedule';
import { usePostSchedule } from '@/hooks/query/useSchedule';
import { checkForOverlaps } from '@/utils/checkForOverlaps';

export default function ScheduleCreatePage() {
  const { showToast } = useToastStore();
  const router = useRouter();
  const { mutate: postSchedule } = usePostSchedule();
  const onSubmit = async (data: ScheduleRequest) => {
    const overlaps = checkForOverlaps(data.data);
    if (overlaps.length > 0) {
      showToast(`중복된 스케줄이 있습니다. (${overlaps.join(', ')})`, 'error');
      return;
    }
    try {
      await postSchedule(data);
      showToast('정기 스케줄 등록을 완료했습니다.', 'success');
      router.push('/my/schedule');
    } catch {
      showToast('정기 스케줄 등록에 실패했습니다.', 'error');
    }
  };
  return <ScheduleForm title="정기 스케줄 등록" onSubmit={onSubmit} />;
}
