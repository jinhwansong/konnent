import { CategoryTabType, MentoringSortType } from '@/contact/mentoring';
import { getSessionDetail, getSessions } from '@/libs/main';
import { SessionDetailResponse, SessionResponse } from '@/types/main';
import { useQuery } from '@tanstack/react-query';

export const useGetSession = (
  page: number,
  category: CategoryTabType = 'all',
  limit: number = 10,
  sort: MentoringSortType = 'latest',
) => {
  return useQuery<SessionResponse>({
    queryKey: ['sessions', page, category, limit, sort],
    queryFn: () => getSessions(page, category, limit, sort),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

export const useGetSessionDetail = (id: string) => {
  return useQuery<SessionDetailResponse>({
    queryKey: ['main-session', id],
    queryFn: () => getSessionDetail(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};
