import {
  patchNickname,
  patchPhone,
  patchPassword,
  patchIsCompanyHidden,
  patchCompany,
  patchPosition,
  patchCareer,
  patchExpertise,
  getMentorProfile,
} from '@/libs/mypage';
import {
  CareerRequest,
  CompanyHiddenRequest,
  CompanyRequest,
  ExpertiseRequest,
  MentorProfileResponse,
  NicknameRequest,
  PasswordRequest,
  PhoneRequest,
  PositionRequest,
} from '@/types/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';

export const usePatchNickname = () => {
  const { update } = useSession();
  return useMutation({
    mutationFn: (nickname: NicknameRequest) => patchNickname(nickname),
    onSuccess: async (data) => {
      await update({ nickname: data.nickname });
    },
  });
};

export const usePatchPhone = () => {
  const { update } = useSession();
  return useMutation({
    mutationFn: (phone: PhoneRequest) => patchPhone(phone),
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

export const useGetMentorProfile = () => {
  const { data: session } = useSession();

  return useQuery<MentorProfileResponse>({
    queryKey: ['mentor-profile', session],
    queryFn: () => getMentorProfile(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user,
  });
};

export const usePatchCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CompanyRequest) => patchCompany(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['mentor-profile'] });

      const prevData = queryClient.getQueryData<MentorProfileResponse>([
        'mentor-profile',
      ]);

      // UI 먼저 업데이트
      if (prevData) {
        queryClient.setQueryData<MentorProfileResponse>(
          ['mentor-profile'],
          (old) =>
            old
              ? {
                  ...old,
                  company: newData.company,
                }
              : old,
        );
      }

      // 실패했을 때 롤백할 데이터 반환
      return { prevData };
    },
    onError: (err, newData, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['mentor-profile'], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['mentor-profile'] });
    },
  });
};

export const usePatchPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PositionRequest) => patchPosition(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['mentor-profile'] });

      const prevData = queryClient.getQueryData<MentorProfileResponse>([
        'mentor-profile',
      ]);

      // UI 먼저 업데이트
      if (prevData) {
        queryClient.setQueryData<MentorProfileResponse>(
          ['mentor-profile'],
          (old) =>
            old
              ? {
                  ...old,
                  position: newData.position,
                }
              : old,
        );
      }

      // 실패했을 때 롤백할 데이터 반환
      return { prevData };
    },
    onError: (err, newData, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['mentor-profile'], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['mentor-profile'] });
    },
  });
};

export const usePatchCareer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CareerRequest) => patchCareer(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['mentor-profile'] });

      const prevData = queryClient.getQueryData<MentorProfileResponse>([
        'mentor-profile',
      ]);

      // UI 먼저 업데이트
      if (prevData) {
        queryClient.setQueryData<MentorProfileResponse>(
          ['mentor-profile'],
          (old) =>
            old
              ? {
                  ...old,
                  career: newData.career,
                }
              : old,
        );
      }

      // 실패했을 때 롤백할 데이터 반환
      return { prevData };
    },
    onError: (err, newData, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['mentor-profile'], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['mentor-profile'] });
    },
  });
};

export const usePatchExpertise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ExpertiseRequest) => patchExpertise(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['mentor-profile'] });

      const prevData = queryClient.getQueryData<MentorProfileResponse>([
        'mentor-profile',
      ]);

      // UI 먼저 업데이트
      if (prevData) {
        queryClient.setQueryData<MentorProfileResponse>(
          ['mentor-profile'],
          (old) =>
            old
              ? {
                  ...old,
                  expertise: newData.expertise,
                }
              : old,
        );
      }

      // 실패했을 때 롤백할 데이터 반환
      return { prevData };
    },
    onError: (err, newData, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['mentor-profile'], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['mentor-profile'] });
    },
  });
};
export const usePatchIsCompanyHidden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CompanyHiddenRequest) => patchIsCompanyHidden(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ['mentor-profile'] });

      const prevData = queryClient.getQueryData<MentorProfileResponse>([
        'mentor-profile',
      ]);

      // UI 먼저 업데이트
      if (prevData) {
        queryClient.setQueryData<MentorProfileResponse>(
          ['mentor-profile'],
          (old) =>
            old
              ? {
                  ...old,
                  isCompanyHidden: newData.isCompanyHidden,
                }
              : old,
        );
      }

      // 실패했을 때 롤백할 데이터 반환
      return { prevData };
    },
    onError: (err, newData, context) => {
      if (context?.prevData) {
        queryClient.setQueryData(['mentor-profile'], context.prevData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['mentor-profile'] });
    },
  });
};
