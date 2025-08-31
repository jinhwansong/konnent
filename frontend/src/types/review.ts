export interface Reviews {
  rating: number;
  content: string;
}

export interface ReviewRequest extends Reviews {
  reservationId: string;
}
