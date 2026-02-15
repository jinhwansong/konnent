'use client';
import { Search } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/main/banner01.avif',
    title: '현직자의 진짜 노하우를 배우는 시간',
    subtext: '실무에서 바로 쓰는 기술과 트렌드를 익히세요',
  },
  {
    id: 2,
    image: '/main/banner02.avif',
    title: '1:1 맞춤형 멘토링으로 커리어 점프업',
    subtext: '당신만을 위한 맞춤형 로드맵을 제안합니다',
  },
  {
    id: 3,
    image: '/main/banner03.avif',
    title: '지식 공유로 함께 성장하는 커뮤니티',
    subtext: '함께 고민하고 해결하며 더 큰 성장을 경험하세요',
  },
];

export default function HeroSection() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-10 px-5 sm:px-8 lg:flex-row lg:justify-between lg:gap-16 xl:px-0">
        <div className="flex w-full flex-col lg:w-[40%]">
          <h2 className="mb-4 text-3xl font-bold text-[var(--text-bold)] sm:text-4xl lg:text-4xl lg:leading-[1.2]">
            성장을 향한 가장 빠른 연결,
            <br />
            <span className="text-[var(--primary)]">Konnect</span>와 함께하세요
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-[var(--text-sub)] sm:text-xl">
            실무 전문가의 노하우부터 1:1 멘토링까지,
            <br className="hidden sm:block" />
            검증된 전문가들이 당신의 내일을 준비합니다.
          </p>

          <div className="relative w-full max-w-[640px]">
            <div className="group flex h-16 w-full items-center rounded-full bg-[var(--card-bg)] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all focus-within:shadow-[0_8px_30px_rgba(0,0,0,0.12)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10 dark:shadow-none dark:border dark:border-[var(--border-color)]">
              <div className="flex flex-1 items-center pl-6 pr-2">
                <Search className="h-6 w-6 text-[var(--primary)] transition-transform group-focus-within:scale-110" />
                <input
                  type="text"
                  placeholder="필요한 전문가나 서비스를 검색해보세요"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                  className="ml-4 w-full border-none bg-transparent text-lg text-[var(--text-bold)] outline-none placeholder:text-[var(--text-sub)]/60"
                />
              </div>
              <button className="h-full rounded-full bg-[var(--primary)] px-10 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:opacity-90 active:scale-95">
                검색
              </button>
            </div>
            
            {/* Quick Keywords */}
            <div className="mt-5 flex flex-wrap gap-2.5 px-4">
              <span className="py-1.5 text-sm font-semibold text-[var(--text-sub)]">
                추천 키워드:
              </span>
              {['#디자인', '#개발', '#마케팅', '#컨설팅'].map(tag => (
                <button
                  key={tag}
                  className="rounded-full border border-[var(--border-color)] bg-[var(--primary-sub02)] px-4 py-1.5 text-xs font-medium text-[var(--text-sub)] transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:shadow-md hover:shadow-[var(--primary)]/20"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative w-full lg:w-[50%]">
          <Swiper
            modules={[Autoplay, EffectCreative]}
            effect="creative"
            creativeEffect={{
              prev: {
                shadow: true,
                translate: ['-20%', 0, -1],
              },
              next: {
                translate: ['100%', 0, 0],
              },
            }}
            loop
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="aspect-[16/9] w-full overflow-visible rounded-3xl"
          >
            {HERO_SLIDES.map(slide => (
              <SwiperSlide
                key={slide.id}
                className="overflow-hidden rounded-3xl shadow-2xl"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-10 left-10">
                      <span className="rounded-full bg-[var(--primary)] px-4 py-1 text-xs font-bold text-white">
                        HOT
                      </span>
                      <h3 className="mt-3 text-3xl font-bold text-white shadow-sm">
                        {slide.title}
                      </h3>
                      <p className="mt-2 text-lg text-white/90">
                        {slide.subtext}
                      </p>
                    </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Subtle Decorative Layers for Book-like feel */}
          <div className="absolute -top-4 -right-4 -z-10 h-full w-full rounded-3xl bg-[var(--primary)] opacity-10" />
          <div className="absolute -top-2 -right-2 -z-10 h-full w-full rounded-3xl bg-[var(--primary)] opacity-20" />
        </div>
      </div>
    </section>
  );
}
