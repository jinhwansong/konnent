
import React from 'react';
import Nav from '@/app/(client)/_component/Nav';
import styles from '@/styles/_common.module.scss';
import ProgramForm from '../../../_component/ProgramForm';
import { Metadata } from 'next';
import { fetchProgram } from '@/app/_lib/useServer';


// 메타데이터
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const data = await fetchProgram(id)
   return {
     title: '커넥트 - 한 걸음 더 나아가는 연결 | 멘토링 프로그램 수정',
     description: data.content + '수정',
     openGraph: {
       title: '커넥트 - 한 걸음 더 나아가는 연결 | 멘토링 프로그램 수정',
       description: data.content + '수정',
     },
   };
}


export default async function page({ params }: { params: { id: string } }) {
  const program = await fetchProgram(params.id);
  return (
    <div className={styles.mypage}>
      <Nav />
      <ProgramForm mode="modify" initialData={program} />
    </div>
  );
}
