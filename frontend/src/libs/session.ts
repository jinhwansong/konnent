import {
  SessionDetailResponse,
  SessionRequest,
  SessionResponse,
} from '@/types/session';
import { fetcher } from '@/utils/fetcher';

export const getSession = async (page: number): Promise<SessionResponse> => {
  return fetcher<SessionResponse>(`mentoring?page=${page}&limit=10`, {
    method: 'GET',
  });
};

export const getSessionDetail = async (
  id: string,
): Promise<SessionDetailResponse> => {
  return fetcher<SessionDetailResponse>(`mentoring/${id}`, {
    method: 'GET',
  });
};

export const toggleSessionPublic = async (id: string, isPublic: boolean) => {
  return fetcher(`mentoring/${id}/public`, {
    method: 'PATCH',
    body: JSON.stringify({ isPublic: !isPublic }),
  });
};

export const deleteSession = async (id: string) => {
  return fetcher(`mentoring/${id}`, {
    method: 'DELETE',
  });
};

export const patchSession = async (id: string, data: SessionRequest) => {
  return fetcher<SessionRequest>(`mentoring/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const postSession = async (data: SessionRequest) => {
  return fetcher<SessionRequest>(`mentoring`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
