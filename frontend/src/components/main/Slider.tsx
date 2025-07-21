'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function Slider() {
  const swiperRef = useRef<SwiperType | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const slideItem = [
    {
      img: '/banner01.avif',
      title: '좋은 멘토가 되어주세요',
      description: '지식과 경험을 나누고 성장하는 여정, 지금 지원하세요',
      href: '/mentors',
    },
    {
      img: '/banner02.avif',
      title: '멘토링 일정, 미리 확인하고 예약하세요',
      description: '원하는 멘토의 일정을 보고 편하게 신청할 수 있어요',
      href: '/schedule',
    },
    {
      img: '/banner03.avif',
      title: '멘토들의 노하우를 먼저 읽어보세요',
      description: '실무자들이 전하는 진짜 이야기, 아티클에서 확인하세요',
      href: '/articles',
    },
    {
      img: '/banner04.avif',
      title: '당신에게 맞는 멘토를 찾아보세요',
      description: '관심 분야, 성향, 경험 기반으로 멘토를 추천해드립니다',
      href: '/mentor',
    },
  ];
  const arrowItem = [
    {
      img: <GoArrowLeft />,
      arrow: () => swiperRef.current?.slidePrev(),
      id: 1,
    },
    {
      img: <GoArrowRight />,
      arrow: () => swiperRef.current?.slideNext(),
      id: 2,
    },
  ];
  return (
    <article
      className={`relative mt-10 mb-16 -ml-5 object-cover transition-opacity duration-300 ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex justify-center">
        <div className="absolute top-1/2 z-10 flex justify-between md:w-[768px] lg:w-[1200px]">
          {arrowItem.map((item) => (
            <button
              key={item.id}
              onClick={item.arrow}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow"
            >
              {item.img}
            </button>
          ))}
        </div>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={3.2}
        loop
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="[&_.swiper-slide]:w-[calc((100%-40px)/3.2)] [&_.swiper-slide]:flex-shrink-0"
      >
        {slideItem.map((item, index) => (
          <SwiperSlide key={item.title}>
            <Link
              href={item.href}
              className="relative block aspect-[580/320] overflow-hidden rounded-lg"
            >
              <Image
                src={item.img}
                alt={item.description}
                fill
                sizes="(max-width: 768px) 90vw, 360px"
                onLoad={() => setImageLoaded(true)}
                priority={index < 3}
              />
              <div className="absolute bottom-5 left-5">
                <em className="font-semibold tracking-[-0.5%] text-white lg:text-2xl lg:leading-[32px]">
                  {item.title}
                </em>
                <p className="tracking-[-0.25%] text-white lg:mt-1.5 lg:text-base lg:leading-[24px]">
                  {item.description}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </article>
  );
}
