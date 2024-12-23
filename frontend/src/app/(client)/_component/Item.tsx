'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import style from './item.module.scss';

type IItem = {
  id: number;
  img: string;
  title: string;
  name: string;
  job: string;
  tag: string;
};

export default function Item({ id, img, title, name, job, tag }: IItem) {
  return (
    <Link href={`/Mentorrs/${id}`}>
      <div className={style.imgbox}>
        <Image src={img} alt={name} width={190} height={260} />
        <div className={style.Mentor_textbox}>
          <h5>{job}</h5>
          <p>{name} 멘토</p>
        </div>
      </div>
      <div className={style.textbox}>
        <span>{tag}</span>
        <em>{title}</em>
      </div>
    </Link>
  );
}
