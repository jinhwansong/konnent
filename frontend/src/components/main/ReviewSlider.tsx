'use client';
import { Star, Quote } from 'lucide-react';
import React from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const REVIEWS = [
  {
    id: 1,
    user: '김*민',
    service: '로고 디자인',
    content: '요청한 사항을 완벽하게 반영해주셨어요. 결과물이 너무 세련되어서 만족스럽습니다!',
    rating: 5,
  },
  {
    id: 2,
    user: '이*준',
    service: '웹 개발 컨설팅',
    content: '전문적인 지식으로 막혔던 부분을 시원하게 해결해주셨습니다. 강력 추천합니다.',
    rating: 5,
  },
  {
    id: 3,
    user: '박*혜',
    service: '퍼스널 브랜딩',
    content: '나만의 강점을 잘 찾아주셔서 자신감을 얻었습니다. 멘토링 비용이 아깝지 않네요.',
    rating: 4,
  },
  {
    id: 4,
    user: '최*우',
    service: '영상 편집',
    content: '속도도 빠르고 퀄리티도 대단합니다. 다음에도 꼭 다시 이용하고 싶어요.',
    rating: 5,
  },
];

export default function ReviewSlider() {
  return (
    <section className="bg-[var(--bg-soft-gray)] py-20">
      <div className="mx-auto px-5 sm:px-8 md:max-w-[1200px] xl:px-0">
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold text-[var(--text-bold)]">생생한 이용 후기</h3>
          <p className="mt-2 text-[var(--text-sub)]">Konnect와 함께한 성공적인 경험담을 들어보세요</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="review-swiper pb-14"
        >
          {REVIEWS.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="h-full rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex items-center justify-between">
                  <Quote className="h-8 w-8 text-[var(--kmong-blue)] opacity-20" />
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                
                <p className="mb-6 text-[var(--text)] leading-relaxed">
                  "{review.content}"
                </p>
                
                <div className="mt-auto flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[var(--primary-sub02)] flex items-center justify-center font-bold text-[var(--primary)]">
                    {review.user[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-bold)]">{review.user}</p>
                    <p className="text-xs text-[var(--text-sub)]">{review.service}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <style jsx global>{`
        .review-swiper .swiper-pagination-bullet-active {
          background: #3a7bd5;
        }
      `}</style>
    </section>
  );
}


