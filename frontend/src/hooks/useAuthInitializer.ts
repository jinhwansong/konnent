'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
export const useAuthInitializer = () => {
  const { setAccessToken, setAuthLoading, resetToken } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/refresh`,
          {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          },
        );

        if (!res.ok) throw new Error('refresh 실패');

        const data = await res.json();

        if (data.accessToken) {
          setAccessToken(data.accessToken);
        } else {
          resetToken();
        }
      } catch {
        resetToken();
      } finally {
        setAuthLoading(false); // 꼭 필요!
      }
    };

    init();
  }, [resetToken, setAccessToken, setAuthLoading]);
};
