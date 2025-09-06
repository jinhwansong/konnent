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

export const sendEmailVerification = (
  data: SendEmailVerificationRequest,
): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('auth/email/verify/send', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const verifyEmailCode = (
  data: VerifyEmailCodeRequest,
): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('auth/email/verify/confirm', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const registerUser = (data: JoinRequest): Promise<MessageResponse> => {
  return fetcher<MessageResponse>('auth/join', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
