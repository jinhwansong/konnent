import { UserProp } from '@/types/user';
import { fetcher } from '@/utils/fetcher';

export const userInfo = async (): Promise<UserProp> => {
  return fetcher<UserProp>('user', {
    method: 'GET',
  });
};
