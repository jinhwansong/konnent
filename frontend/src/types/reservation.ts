export type Slot = { startTime: string; endTime: string };

export interface ReservationTimeItem {
  startTime: string;
  endTime: string;
}

export interface ReservationTimeResponse {
  data: ReservationTimeItem[];
}

export interface ReservationDaysResponse {
  data: string[];
}

interface Reservation {
  date: string;
  question: string;
}

export interface ReservationRequest extends Reservation {
  timeSlot: Slot;
}
export interface ReservationRequests extends Reservation {
  sessionId: string;
}
export interface ReservationResponse {
  reservationId: string;
}

export interface PaymentRequest {
  paymentKey: string;
  orderId: string;
  price: number;
}

export interface PaymentResponse {
  message: string;
  receiptUrl: string;
}

export interface ReservationDone {
  reservationId: string;
  mentorName: string;
  date: string;
  startTime: string;
  endTime: string;
  meetingUrl: string;
}

export interface ReservationMenteeItem {
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  sessionTitle: string;
  mentorName: string;
  roomId: string;
  canEnter: string;
}
export interface ReservationMenteeResponse {
  data: ReservationMenteeItem[];
  totalPage: number;
  message: string;
}
