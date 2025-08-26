export const fetcher = async <T>(path: string, init: RequestInit = {}) => {
  const isServer = typeof window === 'undefined';

  const BASE_URL = isServer ? process.env.NEXT_PUBLIC_AUTH_URL : '/api/proxy';
  const res = await fetch(`${BASE_URL}/${path}`, {
    ...init,
    headers: {
      ...(init.body instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...(init.headers || {}),
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.data || '요청 실패');
  return data as T;
};
