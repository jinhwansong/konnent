import React from 'react';
import MentorDetail from '@/components/mentors/MentorDetail';
import ConfirmModal from '@/components/mentors/ConfirmModal';

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <ConfirmModal sessionId={id} />
      <MentorDetail sessionId={id} />
    </>
  );
}
