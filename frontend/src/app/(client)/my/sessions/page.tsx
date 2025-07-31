'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/common/Pagination';
import FlexibleTable from '@/components/common/FlexibleTable';
import { useGetSession } from '@/hooks/query/useSession';
import { SessionItem } from '@/types/session';
import { sessionsColumns } from '@/contact/session';

export default function SessionPage() {
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
          className="block rounded-md bg-[var(--primary-sub01)] px-4 py-3 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-[var(--primary)]"
        >
          + 세션 등록
        </Link>
      </div>
      <FlexibleTable
        data={sessions?.data as SessionItem[]}
        columns={sessionsColumns}
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
