'use client'
import React from 'react'
import Image from 'next/image';
import style from './item.module.scss';
import { getImageUrl } from '@/util/getImageUrl';
import Link from 'next/link';
import { formatDate } from '@/util/formatDate';
import { formatNumber } from '@/util/formatNumber';

interface IItem {
  create: string;
  price: number;
  status: string;
  title: string;
  duration: number;
  image: string;
  job:string;
  id:number
  link:string;
}


export default function Item({
  link,
  id,
  create,
  price,
  status,
  title,
  duration,
  image,
}: IItem) {
  return (
    <Link href={`${link}/${id}`} className={style.mentoring_wrap}>
      <div className={style.mentoring_imgbox}>
        <Image src={getImageUrl(image)} alt="mentor" width={196} height={262} />
        <span className={style.status}>{status === 'active' && '진행중'}</span>
      </div>
      <div className={style.mentoring_info}>
        <h4>프로그램 제목</h4>
        <div className={style.program_meta}>
          <span>1회 당 시간 : {duration}분</span>
          <span>가격 : {formatNumber(price)}원</span>
          <span>생성일 : {formatDate(create)}</span>
        </div>
      </div>
    </Link>
  );
}
