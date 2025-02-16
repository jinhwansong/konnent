'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Nav from '@/app/(client)/_component/Nav';
import TimeTable from './TimeTable';
import ButtonRouter from './ButtonRouter';
import { formatDate } from '@/util/formatDate';
import { formatNumber } from '@/util/formatNumber';
import { stateus } from '@/util/status';
import HtmlWrapper from '@/app/_component/HtmlWrapper';
import { getDetailProgram } from '@/app/_lib/useProgram';
import { ISchedule } from '@/type';
import styles from '@/styles/_common.module.scss';
import style from './program.module.scss';

export default function ProgramDetail({ id }: { id: string }) {
  const { data } = useQuery({
    queryKey: ['mentorDetail', id],
    queryFn: () => getDetailProgram(id),
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  const schedule: ISchedule = data?.available_schedule;
  return (
    <div className={styles.mypage}>
      <Nav />
      <section className={style.program_section}>
        <div className={style.detail_top_tip}>
          <h4 className={style.program_title}>
            멘토링 생성/관리
            <span
              className={data?.status === 'active' ? style.status : style.none}
            >
              {stateus(data?.status)}
            </span>
          </h4>
          <TimeTable schedule={schedule} duration={data?.duration}>
            멘토링 일정표
          </TimeTable>
        </div>
        <div className={style.detail_top}>
          <h5 className={style.detail_title}>{data?.title}</h5>
          <ul className={style.detail_info_meta}>
            <li>
              <span>1회당 멘토링 시간 : </span>
              <span>{data?.duration}분</span>
            </li>
            <li>
              <span>1회당 가격 : </span>
              <span>{formatNumber(data?.price)}원</span>
            </li>
            <li>
              <span>평점 : </span>
              <span>
                {data?.averageRating} ({formatNumber(data?.totalRatings)})
              </span>
            </li>
            <li>
              <span>멘토링분야 : </span>
              <span>{data?.mentoring_field}</span>
            </li>
            <li>
              <span>등록일 : </span>
              <span>{formatDate(data?.createdAt)}</span>
            </li>
          </ul>
        </div>
        <div className={style.detail_bottom}>
          <HtmlWrapper html={data?.content} />
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
