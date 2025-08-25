import {
  getMenteePayment,
  getMentorPayment,
  paymentRefunds,
} from '@/libs/payment';
import { PaymentMentee, PaymentMentor } from '@/types/payment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const useGetMentorPayment = (page: number) => {
  const { data: session } = useSession();
  return useQuery<PaymentMentor>({
    queryKey: ['payment-mentor', page],
    queryFn: () => getMentorPayment(page),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user,
  });
};

export const useGetMenteePayment = (page: number) => {
  const { data: session } = useSession();
  return useQuery<PaymentMentee>({
    queryKey: ['payment-mentee', page],
    queryFn: () => getMenteePayment(page),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!session?.user,
  });
};

export const usePaymentRefund = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paymentKey: string) => paymentRefunds(paymentKey),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['payment-mentee'],
      });
      queryClient.invalidateQueries({ queryKey: ['payment-mentor'] });
      queryClient.invalidateQueries({
        queryKey: ['schedule-reservations-detail'],
      });
      queryClient.invalidateQueries({ queryKey: ['schedule-reservations'] });
      queryClient.invalidateQueries({ queryKey: ['reservation-my'] });
      queryClient.invalidateQueries({ queryKey: ['reservation-done'] });
    },
  });
};
