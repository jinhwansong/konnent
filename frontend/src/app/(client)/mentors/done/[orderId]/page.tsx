import React from 'react';

import { getReservationDone } from '@/libs/reservation';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import ReservationDoneDetail from '@/components/mentors/ReservationDoneDetail';

export default async function page({
  params,
}: {
  params: { orderId: string };
}) {
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
