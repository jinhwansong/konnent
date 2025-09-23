'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { useFcmToken } from '@/hooks/useFirebase';

export default function useNotificationInitializer() {
  const { data: session } = useSession();
  const userId = session?.user?.id; // 로그인된 유저 id
  const { requestToken } = useFcmToken(userId);

  useEffect(() => {
    requestToken();
  }, [requestToken]);

  return null; // 렌더링할 UI는 없음
}
