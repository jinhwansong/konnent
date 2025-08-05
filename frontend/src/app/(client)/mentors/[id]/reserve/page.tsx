import React from 'react';
import MentorDetail from '@/components/mentors/MentorDetail';
import ReserveModal from '@/components/mentors/ReserveModal';

export default function page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <>
      <ReserveModal articleId={id} />
      <MentorDetail articleId={id} />
    </>
  );
}
