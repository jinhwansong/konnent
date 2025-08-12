import React from 'react';
import MentorDetail from '@/components/mentors/MentorDetail';
import ConfirmModal from '@/components/mentors/ConfirmModal';

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <ConfirmModal sessionId={id} />
      <MentorDetail sessionId={id} />
    </>
  );
}
