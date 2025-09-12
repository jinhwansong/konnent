import {
  MessageResponse,
  NicknameRequest,
  PasswordRequest,
  PhoneRequest,
} from '@/types/user';
import { fetcher } from '@/utils/fetcher';

export const patchNickname = async (nickname: string) => {
  return fetcher<NicknameRequest>(`user/nickname`, {
    method: 'PATCH',
    body: JSON.stringify({ nickname }),
  });
};

export const patchPhone = async (phone: string) => {
  return fetcher<PhoneRequest>(`user/phone`, {
    method: 'PATCH',
    body: JSON.stringify({ phone }),
  });
};

export const patchPassword = async (data: PasswordRequest) => {
  return fetcher<MessageResponse>(`user/password`, {
    method: 'PATCH',
    body: JSON.stringify({
      newPassword: data.newPassword,
      currentPassword: data.currentPassword,
    }),
  });
};

export const uploadProfileImage = (
  formData: FormData,
): Promise<{ image: string }> => {
  return fetcher<{ image: string }>('user/profile', {
    method: 'PATCH',
    body: formData,
  });
};

export const deleteProfile = async () => {
  return fetcher<MessageResponse>(`user/me`, {
    method: 'Delete',
  });
};
