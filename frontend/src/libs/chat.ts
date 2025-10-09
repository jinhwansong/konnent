import { JoinRoomResponse } from "@/types/chat";
import { fetcher } from "@/utils/fetcher";

export const joinRoomRequest = (id: string) => {
  return fetcher<JoinRoomResponse>(`reservation/joinRoom/${id}`, {
    method: 'POST',
  });
};
