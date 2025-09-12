import { patchNickname, patchPhone, patchPassword } from '@/libs/mypage';
import { PasswordRequest } from '@/types/user';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const usePatchNickname = () => {
  const { update } = useSession();
  return useMutation({
    mutationFn: (nickname: string) => patchNickname(nickname),
    onSuccess: async (data) => {
      await update({ nickname: data.nickname });
    },
  });
};

export const usePatchPhone = () => {
  const { update } = useSession();
  return useMutation({
    mutationFn: (phone: string) => patchPhone(phone),
    onSuccess: async (data) => {
      await update({ phone: data.phone });
    },
  });
};

export const usePatchPassword = () => {
  return useMutation({
    mutationFn: (data: PasswordRequest) => patchPassword(data),
  });
};
