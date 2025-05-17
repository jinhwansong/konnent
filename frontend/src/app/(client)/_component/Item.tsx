'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { getImageUrl } from '@/util/getImageUrl';
import { FaStar, FaBuilding, FaCrown, FaDeezer } from 'react-icons/fa6';
import style from './item.module.scss';
import { IcProfile } from '@/asset';
import { IMentoring } from '@/type';


export default function Item({ items }: IMentoring) {
  return (
    <div className={style.mentorwrap}>
      {items.map((item) => (
        <Link href={`/mentors/1`} key={item.id}>
          <em className={style.title}>
            asdasdasdasdasd asdasdasd asdasdasdsdasdasdasdsd asdasdasdsd
          </em>
          <div className={style.itemtop}>
            <div>
              <em className={style.name}>{item.name} 멘토</em>
              <p className={style.career}>
                <FaDeezer />
                {item.position}
              </p>
              <p className={style.career}>
                <FaCrown />
                {item.career}
              </p>
              {item.company && (
                <p className={style.career}>
                  <FaBuilding />
                  {item.company}
                </p>
              )}
            </div>
            <Image
              className={style.profile}
              src={getImageUrl(item.image) ?? IcProfile}
              alt="멘토이미지"
              width={56}
              height={56}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

