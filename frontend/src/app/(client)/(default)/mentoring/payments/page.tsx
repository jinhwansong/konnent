'use client';
import React from 'react';
import Nav from '@/app/(client)/_component/Nav';
import style from './program.module.scss';
import styles from '@/styles/_common.module.scss';
import Pagenation from '@/app/_component/Pagenation';
import usePage from '@/hooks/usePage';
import { useQuery } from '@tanstack/react-query';
import { getPayment } from '@/app/_lib/usePayment';

export default function Paymentspage() {
  const { onPrevPage, onNextPage, onPage, currentPage } = usePage();
  const { data } = useQuery({
    queryKey: ['payment', currentPage],
    queryFn: () => getPayment(currentPage),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  return (
    <div className={styles.mypage}>
      <Nav />
      <section className={style.management_section}>
        <h4 className={style.management_title}>멘토링 생성/관리</h4>
        <Pagenation
          totalPage={data?.totalPage as number}
          currentPage={currentPage}
          onPage={onPage}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
      </section>
    </div>
  );
}
