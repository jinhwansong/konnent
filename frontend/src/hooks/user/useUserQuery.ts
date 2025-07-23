'use client';
import { useQuery } from '@tanstack/react-query';
import { UserProp } from '@/types/user';
import { userInfo } from '@/libs/userInfo';
import { useAuthStore } from '@/stores/useAuthStore';

export const useUserQuery = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery<UserProp>({
    queryKey: ['user', accessToken],
    queryFn: userInfo,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: false,
    // enabled: !!accessToken,
  });
};
