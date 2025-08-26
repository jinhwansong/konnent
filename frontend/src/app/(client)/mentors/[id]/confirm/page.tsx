import React from 'react';
import MentorDetail from '@/components/mentors/MentorDetail';
import ConfirmModal from '@/components/mentors/ConfirmModal';

interface ConfirmPageProps {
  params: Promise<{ id: string }>;
}

export default async function ConfirmPage({ params }: ConfirmPageProps) {
  const { id } = await params;
  return (
    <>
      <ConfirmModal sessionId={id} />
      <MentorDetail sessionId={id} />
    </>
  );
}
