export const fetcher = async <T>(path: string, init: RequestInit = {}) => {
  const res = await fetch(`/api/proxy/${path}`, {
    ...init,
    headers: {
      ...(init.body instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...(init.headers || {}),
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || '요청 실패');
  return data as T;
};
