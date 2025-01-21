'use client'
import React from 'react'
import { BiSearch } from 'react-icons/bi';
import { formatDate } from '@/util/formatDate';
import usePage from '@/hooks/usePage';
import useInput from '@/hooks/useInput';
import { IColumn, IManagement } from '@/type';
import Table from './Table';
import Button from '@/app/_component/Button';
import Input from '@/app/_component/Input';
import style from './management.module.scss';
import { useQuery } from '@tanstack/react-query';
import { getProgram } from '@/app/_lib/useProgram';
import { useRouter } from 'next/navigation';
import { formatNumber } from '@/util/formatNumber';

export default function Management() {
    const [search, changeSearch] = useInput('');

    const { currentPage, onPrevPage, onNextPage, onPage } = usePage();
    const router = useRouter();
    const column: IColumn<IManagement>[] = [
      { id: 1, name: '번호', render: (item: IManagement) => item?.id },

      { id: 2, name: '제목', render: (item: IManagement) => item?.title },
      {
        id: 3,
        name: '가격',
        render: (item: IManagement) => formatNumber(item?.price) + '원',
      },
      {
        id: 4,
        name: '멘토링 시간',
        render: (item: IManagement) => item?.duration + '시간',
      },
      { id: 5, name: '상태', render: (item: IManagement) => item?.status },
      {
        id: 6,
        name: '신청일',
        render: (item: IManagement) => formatDate(item?.createdAt),
      },
    ];
    const { data } = useQuery({
      queryKey: ['mentors', currentPage],
      queryFn: () => getProgram(currentPage),
      staleTime: 60 * 1000,
      gcTime: 300 * 1000,
    });
  return (
    <section className={style.management_section}>
      <h4 className={style.management_title}>멘토링 생성/관리</h4>
      <div className={style.management_mid}>
        <form className={style.management_search}>
          <Input
            type="text"
            value={search}
            onChange={changeSearch}
            placeholder="생성하신 멘토링 프로그램을 검색해보세요"
            name="search2"
            bg="search"
          />
          <label htmlFor="search2">
            <BiSearch />
          </label>
        </form>
        <Button
          type="button"
          width="Manage"
          onClick={() => router.push('/mentor/addmanagement')}
        >
          멘토링 등록
        </Button>
      </div>
      <Table
        column={column}
        data={data}
        currentPage={currentPage}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        onPage={onPage}
      />
    </section>
  );
}
