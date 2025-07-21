import { useQuery } from '@tanstack/react-query';
import { UserProp } from '@/types/user';
import { userInfo } from '@/libs/userInfo';

export const useUserQuery = () => {
  return useQuery<UserProp>({
    queryKey: ['user'],
    queryFn: userInfo,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: false,
  });
};
