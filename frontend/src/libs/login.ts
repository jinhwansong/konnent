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

export const logoutUser = () => {
  return fetcher('auth/logout', {
    method: 'POST',
  });
};
