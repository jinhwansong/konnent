'use client';
import Pagination from '@/components/common/Pagination';
import { useGetMyReservations } from '@/hooks/query/useReservation';
import React, { useState } from 'react';

export default function ReservationsPage() {
  const [page, setPage] = useState(1);
  const { data: myReservations, isLoading } = useGetMyReservations(page);
  if (isLoading) return null;
  return (
    <section className="flex-1">
      <h4 className="mb-6 text-2xl font-bold text-[var(--text-bold)]">
        멘토링 일정
      </h4>
      <Pagination
        page={page}
        totalPages={myReservations?.totalPage || 1}
        onChange={(newPage) => setPage(newPage)}
      />
    </section>
  );
}
