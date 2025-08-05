import {
  deleteSession,
  getSession,
  getSessionDetail,
  patchSession,
  postSession,
  toggleSessionPublic,
} from '@/libs/session';
import {
  PatchSession,
  SessionDetailResponse,
  SessionRequest,
  SessionResponse,
} from '@/types/session';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useGetSession = (page: number) => {
  const { data: session } = useSession();

  return useQuery<SessionResponse>({
    queryKey: ['session', page],
    queryFn: () => getSession(page),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user,
  });
};

export const useGetSessionDetail = (id: string) => {
  const { data: session } = useSession();

  return useQuery<SessionDetailResponse>({
    queryKey: ['session-detail', id],
    queryFn: () => getSessionDetail(id),
    retry: false,
    enabled: !!session?.user,
  });
};

export const useTogglePublic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isPublic }: { id: string; isPublic: boolean }) =>
      toggleSessionPublic(id, isPublic),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session-detail'] });
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};

export const useDeleteSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};

export const usePostSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SessionRequest) => postSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};

export const usePatchSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: PatchSession) => patchSession(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session-detail'] });
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
