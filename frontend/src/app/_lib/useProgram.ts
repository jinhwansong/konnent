'use client';

import { useMutation } from '@tanstack/react-query';
import { ICreateProgram, IModifyProgram } from '@/type';

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
export const useCreateProgram = () => {
  return useMutation({
    mutationFn: async ({ title, content, price, duration }: ICreateProgram) => {
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
export const useModifyProgram = () => {
  return useMutation({
    mutationFn: async ({
      title,
      content,
      price,
      duration,
      id,
    }: IModifyProgram) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/program/${id}`,
        {
          method: 'PATCH',
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
export const useDeleteProgram = () => {
  return useMutation({ mutationFn: async(id:number)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/program/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw data;
    }
    return data;
  }});
}

