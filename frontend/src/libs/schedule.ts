import {
  ScheduleRequest,
  ScheduleReservationsDetailResponse,
  ScheduleReservationsResponse,
  ScheduleResponse,
} from '@/types/schedule';
import { fetcher } from '@/utils/fetcher';

export const getScheduleReservations = async (
  page: number,
): Promise<ScheduleReservationsResponse> => {
  return fetcher<ScheduleReservationsResponse>(
    `schedule/reservations/?page=${page}&limit=10`,
    {
      method: 'GET',
    },
  );
};
export const getScheduleReservationsDetail = async (
  id: string,
): Promise<ScheduleReservationsDetailResponse> => {
  return fetcher<ScheduleReservationsDetailResponse>(
    `schedule/reservations/${id}`,
    {
      method: 'GET',
    },
  );
};

export const deleteSchedule = async (id: string) => {
  return fetcher(`schedule/${id}`, {
    method: 'DELETE',
  });
};

export const patchSchedule = async (data: ScheduleRequest) => {
  return fetcher<ScheduleRequest>(`schedule`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const postSchedule = async (data: ScheduleRequest) => {
  return fetcher<ScheduleRequest>(`schedule`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getSchedule = async (): Promise<ScheduleResponse> => {
  return fetcher<ScheduleResponse>(`schedule`, {
    method: 'GET',
  });
};
