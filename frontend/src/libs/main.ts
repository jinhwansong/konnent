import { CategoryTabType, MentoringSortType } from '@/contact/mentoring';
import { SessionDetailResponse, SessionResponse } from '@/types/main';
import { fetcher } from '@/utils/fetcher';

export const getSessions = async (
  page: number,
  category: CategoryTabType = 'all',
  limit: number,
  sort: MentoringSortType = 'latest',
): Promise<SessionResponse> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
  });
  if (category !== 'all') {
    searchParams.append('category', category);
  }
  return fetcher<SessionResponse>(`session?${searchParams.toString()}`, {
    method: 'GET',
  });
};

export const getSessionDetail = async (
  id: string,
): Promise<SessionDetailResponse> => {
  return fetcher<SessionDetailResponse>(`session/${id}`, {
    method: 'GET',
  });
};
