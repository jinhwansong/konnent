import {
  deleteSchedule,
  getSchedule,
  getScheduleReservations,
  getScheduleReservationsDetail,
  patchSchedule,
  postSchedule,
} from '@/libs/schedule';
import { useAuthStore } from '@/stores/useAuthStore';
import {
  ScheduleRequest,
  ScheduleReservationsDetailResponse,
  ScheduleReservationsResponse,
  ScheduleResponse,
} from '@/types/schedule';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetScheduleReservations = (page: number) => {
  const { accessToken, isAuthLoading } = useAuthStore();
  return useQuery<ScheduleReservationsResponse>({
    queryKey: ['schedule-reservations', page],
    queryFn: () => getScheduleReservations(page),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!accessToken && !isAuthLoading,
  });
};

export const useGetScheduleReservationsDetail = (id: string) => {
  const { accessToken, isAuthLoading } = useAuthStore();
  return useQuery<ScheduleReservationsDetailResponse>({
    queryKey: ['schedule-reservations-detail', id],
    queryFn: () => getScheduleReservationsDetail(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!accessToken && !isAuthLoading,
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
  const { accessToken, isAuthLoading } = useAuthStore();
  return useQuery<ScheduleResponse>({
    queryKey: ['schedule'],
    queryFn: () => getSchedule(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!accessToken && !isAuthLoading,
  });
};
