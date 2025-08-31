import { postReview } from '@/libs/review';
import { ReviewRequest } from '@/types/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
    },
  });
};
