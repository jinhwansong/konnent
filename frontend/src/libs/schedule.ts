import {
  ScheduleRequest,
  ScheduleReservationsDetailResponse,
  ScheduleReservationsResponse,
  ScheduleResponse,
  ScheduleStatusRequest,
} from '@/types/schedule';
import { MessageResponse } from '@/types/user';
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

export const patchScheduleStatus = async (
  data: ScheduleStatusRequest,
): Promise<MessageResponse> => {
  return fetcher<MessageResponse>(`schedule/reservations/${data.id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ rejectReason: data.rejectReason }),
  });
};

export const deleteSchedule = async (id: string): Promise<MessageResponse> => {
  return fetcher<MessageResponse>(`schedule/${id}`, {
    method: 'DELETE',
  });
};

export const patchSchedule = async (
  data: ScheduleRequest,
): Promise<MessageResponse> => {
  return fetcher<MessageResponse>(`schedule`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const postSchedule = async (
  data: ScheduleRequest,
): Promise<MessageResponse> => {
  return fetcher<MessageResponse>(`schedule`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const getSchedule = async (): Promise<ScheduleResponse> => {
  return fetcher<ScheduleResponse>(`schedule`, {
    method: 'GET',
  });
};
