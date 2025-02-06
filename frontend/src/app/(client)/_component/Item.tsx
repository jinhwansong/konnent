'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import { getImageUrl } from '@/util/getImageUrl';
import { FaStar } from 'react-icons/fa6';
import style from './item.module.scss';
import { IMentoring } from '@/type';


export default function Item({ items }: IMentoring) {
  return (
    <div className={style.mentoring_wrap}>
      {items.length > 0 ? (
        items?.map((item) => (
          <Link key={item.id} href={`/mentor/${item.id}`}>
            <div className={style.imgbox}>
              <Image
                src={getImageUrl(item.image)}
                alt={item.name}
                width={196}
                height={260}
              />
              <div>
                <span>{item.company}</span>
                <p>{item.name} 멘토</p>
              </div>
            </div>
            <div className={style.textbox}>
              <div className={style.textbox_top}>
                <p>{item.mentoring_field}</p>
                <em>{item.title}</em>
                <p className={style.text}>
                  <span>직무</span> {item.position}
                </p>
                <p className={style.text}>
                  <span>경력</span> {item.career}
                </p>
                <span>
                  <FaStar />
                  {item.averageRating}({item.totalRatings})
                </span>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>해당 멘토링은 준비중입니다.</p>
      )}
    </div>
  );
}

