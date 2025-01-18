'use client';
import { IMentorMutation } from '@/type';
import { useMutation, useQuery } from '@tanstack/react-query';
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
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mentor`,
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
export const useMentorData = () => {
  return useQuery({
    queryKey: ['mentordata'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mentor`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = await response.json();
      return res;
    },
  });
};
export const useUpdateCareer = () => {
  return useMutation({
    mutationFn: async (career: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mentor/career`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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
export const useUpdateJob = () => {
  return useMutation({
    mutationFn: async (job: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mentor/job`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            job,
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
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (image: FormData) => {
      console.log(image)
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mentor/profile`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: image,
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
export const useUpdateCompony = () => {
  return useMutation({
    mutationFn: async (company: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mentor/company`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company,
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
export const useUpdateIntroduce = () => {
  return useMutation({
    mutationFn: async (introduce: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/mentor/introduce`,
        {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            introduce,
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