
'use client'
import React from 'react';
import Nav from '@/app/(client)/_component/Nav';
import styles from '@/styles/_common.module.scss';
import ProgramForm from '../../../_component/ProgramForm';
import { useQuery } from '@tanstack/react-query';
import { getDetailProgram } from '@/app/_lib/useProgram';
import { useParams } from 'next/navigation';


export default function Modigy() {
  const params =useParams()
  const { data } = useQuery({
    queryKey: ['mentorDetail', params.id],
    queryFn: () => getDetailProgram(params.id as string),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  return (
    <div className={styles.mypage}>
      <Nav />
      <ProgramForm mode="modify" initialData={data} />
    </div>
  );
}
