import {
  getMyReservations,
  getReservationDays,
  getReservationDone,
  getReservationTime,
  postReservation,
} from '@/libs/reservation';
import {
  ReservationDaysResponse,
  ReservationDone,
  ReservationMenteeResponse,
  ReservationRequests,
  ReservationTimeResponse,
} from '@/types/reservation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useGetReservationsDays = (id: string) => {
  return useQuery<ReservationDaysResponse>({
    queryKey: ['reservation-day', id],
    queryFn: () => getReservationDays(id),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });
};

export const useGetReservationsTime = (id: string, date: string) => {
  return useQuery<ReservationTimeResponse>({
    queryKey: ['reservation-time', id, date],
    queryFn: () => getReservationTime(id, date),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id && !!date,
  });
};

export const useGetReservationDone = (orderId: string) => {
  return useQuery<ReservationDone>({
    queryKey: ['reservation-done', orderId],
    queryFn: () => getReservationDone(orderId),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};

export const useGetMyReservations = (page: number) => {
  const { data: session } = useSession();
  return useQuery<ReservationMenteeResponse>({
    queryKey: ['reservation-my', page],
    queryFn: () => getMyReservations(page),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user,
  });
};

export const usePostReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ReservationRequests) => postReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reservation-day'],
      });
      queryClient.invalidateQueries({ queryKey: ['reservation-time'] });
    },
  });
};
