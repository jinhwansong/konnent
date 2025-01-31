import React from 'react'
import { Metadata } from 'next';
import { fetchProgram } from '@/app/_lib/useServer';
import Nav from '@/app/(client)/_component/Nav';
import { formatDate } from '@/util/formatDate';
import { formatNumber } from '@/util/formatNumber';
import { stateus } from '@/util/status';
import HtmlContent from '@/app/_component/HtmlContent';
import ButtonRouter from '../../_component/ButtonRouter';
import styles from '@/styles/_common.module.scss';
import style from './program.module.scss';

// 메타데이터
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const data = await fetchProgram(id)
   return {
     title: '커넥트 - 한 걸음 더 나아가는 연결 |' + data.title,
     description: data.content,
     openGraph: {
       title: '커넥트 - 한 걸음 더 나아가는 연결 |' + data.title,
       description: data.content,
     },
   };
}




export default async function page({params}:{params:{id:string}}) {
  const program = await fetchProgram(params.id);
  return (
    <div className={styles.mypage}>
      <Nav />
      <section className={style.program_section}>
        <h4 className={style.program_title}>멘토링 생성/관리</h4>
        <div className={style.detail_top}>
          <span
            className={program.status === 'active' ? style.status : style.none}
          >
            {stateus(program.status)}
          </span>
          <h5 className={style.detail_title}>{program.title}</h5>
          <ul className={style.detail_info_meta}>
            <li>
              <span>1회당 멘토링 시간 : </span>
              <span>{program.duration}시간</span>
            </li>
            <li>
              <span>1회당 가격 : </span>
              <span>{formatNumber(program.price)}원</span>
            </li>
            <li>
              <span>평점 : </span>
              <span>
                {program.averageRating} ({formatNumber(program?.totalRatings)})
              </span>
            </li>
            <li>
              <span>등록일 : </span>
              <span>{formatDate(program.createdAt)}</span>
            </li>
          </ul>
        </div>
        <div className={style.detail_bottom}>
          <HtmlContent html={program.content} />
        </div>
        <div className={style.button_wrap}>
          <ButtonRouter bg="none" link="back">
            목록
          </ButtonRouter>
          <ButtonRouter bg="delete" link="delete">
            삭제
          </ButtonRouter>
          <ButtonRouter link="modify">수정</ButtonRouter>
        </div>
      </section>
    </div>
  );
}
