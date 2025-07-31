'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToastStore } from '@/stores/useToast';
import { SessionRequest } from '@/types/session';
import SessionForm from '@/components/my/SessionForm';
import { usePostSession } from '@/hooks/query/useSession';

export default function SessionCreatePage() {
  const [content, setContent] = useState('');
  const { showToast } = useToastStore();
  const router = useRouter();
  const { mutate: postSession } = usePostSession();
  const onSubmit = async (data: SessionRequest) => {
    try {
      await postSession({
        ...data,
        description: content,
      });
      showToast('세션등록을 완료했습니다.', 'success');
      router.push('/my/sessions');
    } catch {
      showToast('세션등록에 실패했습니다.', 'error');
    }
  };

  return (
    <SessionForm
      onSubmit={onSubmit}
      content={content}
      setContent={setContent}
      title="세션 등록"
    />
  );
}
