'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Table from './Table';
import { findMentorAll } from '../_lib/find.mentors';
import usePage from '@/hooks/usePage';
import { formatDate } from '@/hooks/useDate';
import { IAdminMentors } from '@/type';
import { IcProfile } from '@/asset';
import style from './table.module.scss';

export default function Mentors() {
  const { currentPage, onPrevPage, onNextPage, onPage } = usePage();
  const { data } = useQuery({
    queryKey: ['mentors', currentPage],
    queryFn: () => findMentorAll(currentPage),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  const columns = [
    { id: 1, name: '번호', key: 'id' },
    {
      id: 2,
      name: '멘토신청정보',
      key: 'mentor',
      render: (mentor: IAdminMentors) => (
        <div className={style.profile}>
          <Image
            src={mentor.image || IcProfile}
            alt={mentor.name}
            height={35}
            width={35}
          />
          <div>
            <p>{mentor.name}</p>
            <span>{mentor.email}</span>
          </div>
        </div>
      ),
    },
    { id: 3, name: '직무', key: 'job' },
    { id: 4, name: '경력', key: 'career' },
    { id: 5, name: '상태', key: 'status' },
    {
      id: 6,
      name: '신청일',
      key: 'createdAt',
      render: (user: IAdminMentors) => formatDate(user.createdAt),
    },
  ];

  return (
    <Table
      title="멘토 신청 관리"
      columns={columns}
      data={data}
      currentPage={currentPage}
      onPrevPage={onPrevPage}
      onNextPage={onNextPage}
      onPage={onPage}
    />
  );
}
