import { ReviewRequest, ReviewResponse, Reviews } from '@/types/review';
import { MessageResponse } from '@/types/user';
import { fetcher } from '@/utils/fetcher';

export const postReview = async (
  data: ReviewRequest,
): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('review', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const deleteReview = async (id: string) => {
  return fetcher(`review/${id}`, {
    method: 'DELETE',
  });
};

export const patchReview = async (
  id: string,
  data: Reviews,
): Promise<MessageResponse> => {
  return fetcher<MessageResponse>(`review/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const getMentorReview = async (
  page: number,
): Promise<ReviewResponse> => {
  return fetcher<ReviewResponse>(`review/received?page=${page}&limit=10`, {
    method: 'GET',
  });
};
export const getMenteeReview = async (
  page: number,
): Promise<ReviewResponse> => {
  return fetcher<ReviewResponse>(`review/my?page=${page}&limit=10`, {
    method: 'GET',
  });
};
