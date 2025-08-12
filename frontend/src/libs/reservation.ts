import {
  PaymentRequest,
  PaymentResponse,
  ReservationDaysResponse,
  ReservationRequests,
  ReservationResponse,
  ReservationTimeResponse,
} from '@/types/reservation';
import { fetcher } from '@/utils/fetcher';

export const getReservationDays = async (id: string) => {
  return fetcher<ReservationDaysResponse>(`reservation/available-days/${id}`, {
    method: 'GET',
  });
};

export const getReservationTime = async (id: string, date: string) => {
  return fetcher<ReservationTimeResponse>(
    `reservation/available-times/${id}?date=${date}`,
    {
      method: 'GET',
    },
  );
};

export const postReservation = (
  data: ReservationRequests,
): Promise<ReservationResponse> => {
  return fetcher<ReservationResponse>('reservation', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const postPayment = (data: PaymentRequest): Promise<PaymentResponse> => {
  return fetcher<PaymentResponse>('payment/confirm', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
