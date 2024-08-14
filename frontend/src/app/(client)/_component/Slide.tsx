'use client';
import React from 'react';
import Link from 'next/link';
import { SwiperSlide, Swiper } from 'swiper/react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IcMainSlide01, IcMainSlide02 } from '@/asset';
import { useSlide } from '@/hooks';
import styles from './slide.module.scss';

export default function Slide() {
    const { onPrevButton, onNextButton, swiperOptions, setSwiper } = useSlide();
    const mainSlide = [
      {
        id: 1,
        premier: '분야별 아티클',
        title: '나를 변화시키는 힘,',
        title2: '멘토와 아티클의 만남',
        sub: '아티클 확인하기 >',
        img: <IcMainSlide01 />,
      },
      {
        id: 2,
        premier: '분야별 멘토찾기',
        title: '당신의 고민을 해결하는',
        title2: '해결의 마법사!',
        sub: '멘토 찾기 >',

        img: <IcMainSlide02 />,
      },
    ];
  return (
    <article className={styles.article}>
      <button
        onClick={onPrevButton}
        className={`${styles.navi} ${styles.left_button}`}
      >
        <BiChevronLeft />
      </button>
      <button
        onClick={onNextButton}
        className={`${styles.navi} ${styles.right_button}`}
      >
        <BiChevronRight />
      </button>
      <Swiper
        {...swiperOptions.basic}
        onSwiper={(e) => setSwiper(e)}
        className="mainslide"
      >
        {mainSlide.map((swipers) => (
          <SwiperSlide key={swipers.id}>
            <Link href="/" className={styles.swiper}>
              <div className={styles.swiperImg}>{swipers.img}</div>
              <div className={styles.swiperText}>
                <span>{swipers.premier}</span>
                <em>{swipers.title}</em>
                <em>{swipers.title2}</em>
                <p>{swipers.sub}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </article>
  );
}
