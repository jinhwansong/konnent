import { useAuthStore } from '@/stores/useAuthStore';

export const fetcher = async <T>(
  url: string,
  init: RequestInit,
): Promise<T> => {
  const { accessToken, setAccessToken, resetToken } = useAuthStore.getState();

  const isFormData = init.body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/${url}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(init.headers || {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (res.status === 401 && !accessToken && !url.includes('/auth/refresh')) {
    try {
      const refresh = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/auth/refresh`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      const data = await refresh.json();
      setAccessToken(data.accessToken);
      // 새 토큰으로 원래 요청 재시도
      return fetcher(url, init);
    } catch {
      resetToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('토큰 재발급 실패');
    }
  }
  return res.json();
};
