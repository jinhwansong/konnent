'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Table from './Table'
import { findUserAll } from '../_lib/find.user';
import usePage from '@/hooks/usePage';
import { formatDate } from '@/hooks/useDate';
import { IAdminUsers } from '@/type';
import { IcProfile } from '@/asset';
import style from './table.module.scss';


export default function Users() {
    const { currentPage, onPrevPage, onNextPage, onPage } = usePage();
    const { data } = useQuery({
      queryKey: ['users', currentPage],
      queryFn: () => findUserAll(currentPage),
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    });
    const userColumns = [
      { id: 1, name: '번호', key: 'id' },
      {
        id: 2,
        name: '프로필',
        key: 'profile',
        render: (user: IAdminUsers) => (
          <div className={style.profile}>
            <Image
              src={user.image || IcProfile}
              alt={user.name}
              height={35}
              width={35}
            />
            <div>
              <p>{user.name}</p>
              <span>{user.email || user.snsId}</span>
            </div>
          </div>
        ),
      },
      { id: 3, name: '닉네임', key: 'nickname' },
      { id: 4, name: '전화번호', key: 'phone' },
      { id: 5, name: '사용자 권한', key: 'role' },
      {
        id: 6,
        name: '가입일',
        key: 'createdAt',
        render: (user: IAdminUsers) => formatDate(user.createdAt),
      },
    ];

  return (
    <Table
      title="사용자관리"
      columns={userColumns}
      data={data}
      currentPage={currentPage}
      onPrevPage={onPrevPage}
      onNextPage={onNextPage}
      onPage={onPage}
    />
  );
}
