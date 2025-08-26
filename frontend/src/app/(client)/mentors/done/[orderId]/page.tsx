import React from 'react';

import { getReservationDone } from '@/libs/reservation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ReservationDoneDetail from '@/components/mentors/ReservationDoneDetail';

interface DonePageProps {
  params: Promise<{ orderId: string }>;
}

export default async function DonePage({ params }: DonePageProps) {
  const { orderId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['reservationDone', orderId],
    queryFn: () => getReservationDone(orderId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReservationDoneDetail orderId={orderId} />
    </HydrationBoundary>
  );
}
