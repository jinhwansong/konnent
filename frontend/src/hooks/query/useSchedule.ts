import { useQuery } from '@tanstack/react-query';

export const useGetSession = (page: number) => {
  return useQuery<SessionResponse>({
    queryKey: ['session', page],
    queryFn: () => getSession(page),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
