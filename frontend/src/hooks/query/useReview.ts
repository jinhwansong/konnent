import {
  deleteReview,
  getMenteeReview,
  getMentorReview,
  patchReview,
  postReview,
} from '@/libs/review';
import { PatchReview, ReviewRequest, ReviewResponse } from '@/types/review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const usePostReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReviewRequest) => postReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['review-mentee'],
      });
      queryClient.invalidateQueries({
        queryKey: ['review-mentor'],
      });
      queryClient.invalidateQueries({
        queryKey: ['review-detail'],
      });
      queryClient.invalidateQueries({
        queryKey: ['reservation-my'],
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['review-mentee'],
      });
      queryClient.invalidateQueries({
        queryKey: ['review-mentor'],
      });
      queryClient.invalidateQueries({
        queryKey: ['review-detail'],
      });
      queryClient.invalidateQueries({
        queryKey: ['reservation-my'],
      });
    },
  });
};

export const usePatchReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: PatchReview) => patchReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['review-mentee'],
      });
      queryClient.invalidateQueries({
        queryKey: ['review-mentor'],
      });
      queryClient.invalidateQueries({
        queryKey: ['review-detail'],
      });
    },
  });
};

export const useGetMentorReview = (page: number) => {
  const { data: session } = useSession();
  return useQuery<ReviewResponse>({
    queryKey: ['review-mentor', page],
    queryFn: () => getMentorReview(page),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user,
  });
};
export const useGetMenteeReview = (page: number) => {
  const { data: session } = useSession();
  return useQuery<ReviewResponse>({
    queryKey: ['review-mentee', page],
    queryFn: () => getMenteeReview(page),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user,
  });
};
