'use client';
import { useMutation } from '@tanstack/react-query';

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/checkEmail`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
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

export const useCheckNickname = () => {
  return useMutation({
    mutationFn: async (nickname: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/checkNickname`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nickname,
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
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/logout`,
        {
          method: 'POST',
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
    },
  });
};
interface FormData {
  email: string;
  job: string;
  introduce: string;
  portfolio: string;
  career: string;
}

export const useMentor = () => {
  return useMutation<FormData, unknown, FormData>({
    mutationFn: async (formData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Mentor`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          job: formData.job,
          introduce: formData.introduce,
          portfolio: formData.portfolio,
          career: formData.career,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw data;
      }
      return data;
    },
  });
};
