import { mentorApply } from '@/libs/mentorApply';
import { ApplyRequest } from '@/types/apply';
import { useMutation } from '@tanstack/react-query';

export const useMentorApply = () => {
  return useMutation({
    mutationFn: (data: ApplyRequest) => mentorApply(data),
  });
};
