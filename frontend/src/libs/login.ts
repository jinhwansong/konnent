import { LoginRequest, UserProp } from '@/types/user';
import { fetcher } from '@/utils/fetcher';

export const loginUser = ({
  email,
  password,
}: LoginRequest): Promise<UserProp> => {
  return fetcher<UserProp>('auth', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};
