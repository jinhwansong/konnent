export interface SessionDate {
  id: string;
  title: string;
  price: number;
  duration: number;
  rating: number;
  public: boolean;
  createdAt: string;
}
export interface SessionDetailResponse extends SessionDate {
  category: string;
  description: string;
}
export interface SessionResponse {
  data: SessionDate[];
  total: number;
  totalPages: number;
}

export interface SessionRequest {
  title: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}
export interface PatchSession {
  id: string;
  data: SessionRequest;
}
