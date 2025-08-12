import React from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSessionDetail } from '@/libs/main';
import MentorDetail from '@/components/mentors/MentorDetail';

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['main-session', id],
    queryFn: () => getSessionDetail(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MentorDetail sessionId={id} />
    </HydrationBoundary>
  );
}
