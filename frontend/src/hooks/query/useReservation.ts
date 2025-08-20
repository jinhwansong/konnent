import {
  getReservationDays,
  getReservationDone,
  getReservationTime,
} from '@/libs/reservation';
import {
  ReservationDaysResponse,
  ReservationDone,
  ReservationTimeResponse,
} from '@/types/reservation';
import { useQuery } from '@tanstack/react-query';

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
    queryKey: ['reservationDone', orderId],
    queryFn: () => getReservationDone(orderId),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
};
