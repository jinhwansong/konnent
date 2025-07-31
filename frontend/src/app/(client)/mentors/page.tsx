import MentorContent from '@/components/mentors/MentorContent';
import { getSessions } from '@/libs/main';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['sessions', 1, 'all', 20, 'latest'],
    queryFn: () => getSessions(1, 'all', 20, 'latest'),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MentorContent initialCategory="all" />
    </HydrationBoundary>
  );
}
