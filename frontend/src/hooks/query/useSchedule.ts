import {
  deleteSchedule,
  getSchedule,
  getScheduleReservations,
  getScheduleReservationsDetail,
  patchSchedule,
  patchScheduleStatus,
  postSchedule,
} from '@/libs/schedule';
import {
  ScheduleRequest,
  ScheduleReservationsDetailResponse,
  ScheduleReservationsResponse,
  ScheduleResponse,
} from '@/types/schedule';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useGetScheduleReservations = (page: number) => {
  const { data: session } = useSession();
  return useQuery<ScheduleReservationsResponse>({
    queryKey: ['schedule-reservations', page],
    queryFn: () => getScheduleReservations(page),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user,
  });
};

export const useGetScheduleReservationsDetail = (id: string) => {
  const { data: session } = useSession();
  return useQuery<ScheduleReservationsDetailResponse>({
    queryKey: ['schedule-reservations-detail', id],
    queryFn: () => getScheduleReservationsDetail(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user,
  });
};

export const useScheduleStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, rejectReason }: { id: string; rejectReason: string }) =>
      patchScheduleStatus({ id, rejectReason }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedule-reservations-detail'],
      });
      queryClient.invalidateQueries({ queryKey: ['schedule-reservations'] });
    },
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
    },
  });
};

export const usePostSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ScheduleRequest) => postSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
    },
  });
};

export const usePatchSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ScheduleRequest) => patchSchedule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedule'] });
    },
  });
};

export const useGetSchedule = () => {
  const { data: session } = useSession();
  return useQuery<ScheduleResponse>({
    queryKey: ['schedule'],
    queryFn: () => getSchedule(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user,
  });
};
