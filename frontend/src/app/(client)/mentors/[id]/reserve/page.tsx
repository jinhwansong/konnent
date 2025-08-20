import React from 'react';
import MentorDetail from '@/components/mentors/MentorDetail';
import ReserveModal from '@/components/mentors/ReserveModal';

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <>
      <ReserveModal sessionId={id} />
      <MentorDetail sessionId={id} />
    </>
  );
}
