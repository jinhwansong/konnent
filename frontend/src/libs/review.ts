import { ReviewRequest } from '@/types/review';
import { MessageResponse } from '@/types/user';
import { fetcher } from '@/utils/fetcher';

export const postReview = async (
  data: ReviewRequest,
): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('review', {
    method: 'POST',
    body: JSON.stringify({
      reservationId: data.reservationId,
      rating: data.rating,
      content: data.content,
    }),
  });
};
