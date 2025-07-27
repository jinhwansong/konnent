'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Pagination from '@/components/common/Pagination';
import FlexibleTable from '@/components/common/FlexibleTable';
import { useGetSession } from '@/hooks/query/useSession';
import { SessionDate } from '@/types/session';

export default function SessionPage() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { data: sessions, isLoading } = useGetSession(page);
  if (isLoading) return null;

  const columns = [
    {
      header: '제목',
      accessor: (row: SessionDate) => (
        <span className="line-clamp-1 text-[var(--text-bold)]">
          {row.title}
        </span>
      ),
      className: 'w-[470px]',
    },
    {
      header: '시간',
      accessor: (row: SessionDate) => `${row.duration}분`,
      className: 'w-[80px]',
    },
    {
      header: '가격',
      accessor: (row: SessionDate) => `${row.price.toLocaleString()}원`,
      className: 'w-[100px]',
    },
    {
      header: '공개',
      accessor: (row: SessionDate) => (
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs ${
            row.public
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          {row.public ? '공개' : '비공개'}
        </span>
      ),
      className: 'w-[80px]',
    },
    {
      header: '등록일',
      accessor: (row: SessionDate) =>
        format(new Date(row.createdAt), 'yy.MM.dd'),
      className: 'w-[100px]',
    },
  ];
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
