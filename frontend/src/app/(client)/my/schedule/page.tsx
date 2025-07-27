'use client';
import Pagination from '@/components/common/Pagination';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function SchedulePage() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data: sessions, isLoading } = useGetSession(page);
  if (isLoading) return null;
  return (
    <section className="flex-1">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-2xl font-bold text-[var(--text-bold)]">
          내 세션 목록
        </h4>
        <Link
          href="/my/sessions/create"
          className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + 세션 등록
        </Link>
      </div>
      <FlexibleTable
        data={sessions?.data as SessionDate[]}
        columns={columns}
        onRowClick={(row) => router.push(`/my/sessions/${row.id}`)}
      />
      <Pagination
        page={page}
        totalPages={sessions?.totalPages || 1}
        onChange={(newPage) => setPage(newPage)}
      />
    </section>
  );
}
