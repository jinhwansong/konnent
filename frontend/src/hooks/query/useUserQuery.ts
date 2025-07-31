'use client';
import { useQuery } from '@tanstack/react-query';
import { UserProp } from '@/types/user';
import { userInfo } from '@/libs/userInfo';
import { useAuthStore } from '@/stores/useAuthStore';

export const useUserQuery = () => {
  const { accessToken, isAuthLoading } = useAuthStore();
  return useQuery<UserProp>({
    queryKey: ['user', accessToken],
    queryFn: userInfo,
    enabled: !!accessToken && !isAuthLoading,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
