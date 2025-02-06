'use client';

import { useMutation } from '@tanstack/react-query';
import { ICreateProgram, IModifyProgram } from '@/type';

export const getProgram = async (page: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/management?page=${page}&limit=10`,
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
export const getDetailProgram = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/management/${id}`,
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
    mutationFn: async ({
      title,
      content,
      price,
      duration,
      availableSchedule,
      mentoring_field
    }: ICreateProgram) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/management`,
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
            availableSchedule,
            mentoring_field,
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
      availableSchedule,
      id,
      mentoring_field,
    }: IModifyProgram) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/management/${id}`,
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
            availableSchedule,
            mentoring_field,
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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/programs/management/${id}`,
      {
        method: 'DELETE',
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
  }});
}

