export const fetcher = async <T>(
  url: string,
  init: RequestInit,
): Promise<T> => {
  const isFormData = init.body instanceof FormData;

  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/${url}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Fetch error');
  }

  return res.json();
};
