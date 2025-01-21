'use client';
import { IgetProgram } from '@/type';
import { useMutation } from '@tanstack/react-query';

export const getProgram = async (page: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/program?page=${page}&limit=10`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw data;
  }
  return data;
};
export const useProgram = () => {
  return useMutation({
    mutationFn: async ({ title, content, price, duration }: IgetProgram) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/program`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            content,
            price,
            duration,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      return data;
    },
  });
};