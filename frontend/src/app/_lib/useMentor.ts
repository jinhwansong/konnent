'use client';
import { IMentorMutation } from '@/type';
import { useMutation } from '@tanstack/react-query';
export const useMentor = () => {
  return useMutation({
    mutationFn: async ({
      email,
      job,
      introduce,
      portfolio,
      career,
    }: IMentorMutation) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/Mentor`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            job,
            introduce,
            portfolio,
            career,
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
