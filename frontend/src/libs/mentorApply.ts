import { ApplyRequest } from '@/types/apply';
import { MessageResponse } from '@/types/user';
import { fetcher } from '@/utils/fetcher';

export const mentorApply = async (
  data: ApplyRequest,
): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('mentor/apply', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
