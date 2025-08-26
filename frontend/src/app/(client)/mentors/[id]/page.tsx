import React from 'react';
import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getSessionDetail } from '@/libs/main';
import MentorDetail from '@/components/mentors/MentorDetail';

interface MentorsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MentorsPageProps): Promise<Metadata> {
  const { id } = await params;

  const session = await getSessionDetail(id);

  return {
    title: session.title,
    description: session.description.slice(0, 150),
    openGraph: {
      title: session.title,
      description: session.description.slice(0, 150),
      images: session.image ? [session.image] : [],
    },
  };
}

export default async function MentorsPage({ params }: MentorsPageProps) {
  const { id } = await params;

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
