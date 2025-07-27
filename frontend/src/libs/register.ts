import { fetcher } from '@/utils/fetcher';
import {
  MessageResponse,
  JoinRequest,
  SendEmailVerificationRequest,
  VerifyEmailCodeRequest,
} from '@/types/user';

export const duplicateEmail = (email: string): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('auth/duplicateEmail', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const duplicateNickname = (
  nickname: string,
): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('auth/duplicateNickname', {
    method: 'POST',
    body: JSON.stringify({ nickname }),
  });
};

export const sendEmailVerification = ({
  email,
}: SendEmailVerificationRequest): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('auth/email/verify/send', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
};

export const verifyEmailCode = ({
  email,
  code,
}: VerifyEmailCodeRequest): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('auth/email/verify/confirm', {
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
}: JoinRequest): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('auth/join', {
    method: 'POST',
    body: JSON.stringify({ email, nickname, password, name, phone }),
  });
};
