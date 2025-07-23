import { fetcher } from '@/utils/fetcher';
import {
  DuplicateResponse,
  JoinRequest,
  SendEmailVerificationRequest,
  VerifyEmailCodeRequest,
} from '@/types/user';

export const duplicateEmail = (email: string): Promise<DuplicateResponse> => {
  return fetcher<DuplicateResponse>('auth/duplicateEmail', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const duplicateNickname = (
  nickname: string,
): Promise<DuplicateResponse> => {
  return fetcher<DuplicateResponse>('auth/duplicateNickname', {
    method: 'POST',
    body: JSON.stringify({ nickname }),
  });
};

export const sendEmailVerification = ({
  email,
}: SendEmailVerificationRequest): Promise<DuplicateResponse> => {
  return fetcher<DuplicateResponse>('auth/email/verify/send', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const verifyEmailCode = ({
  email,
  code,
}: VerifyEmailCodeRequest): Promise<DuplicateResponse> => {
  return fetcher<DuplicateResponse>('auth/email/verify/confirm', {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  });
};

export const registerUser = ({
  email,
  nickname,
  password,
  name,
  phone,
}: JoinRequest): Promise<DuplicateResponse> => {
  return fetcher<DuplicateResponse>('auth/join', {
    method: 'POST',
    body: JSON.stringify({ email, nickname, password, name, phone }),
  });
};
