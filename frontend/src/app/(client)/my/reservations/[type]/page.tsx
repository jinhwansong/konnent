'use client';
import React, { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/common/Pagination';
import { useGetMyReservations } from '@/hooks/query/useReservation';
import Button from '@/components/common/Button';
import ReservationCard from '@/components/my/ReservationCard';
import ReviewForm from '@/components/my/ReviewForm';
import {
  PastReservationItem,
  ReservationMenteeItem,
} from '@/types/reservation';
import { usePostReview } from '@/hooks/query/useReview';
import { ReviewRequest } from '@/types/review';
import { useToastStore } from '@/stores/useToast';

export default function ReservationsPage() {
  const { showToast } = useToastStore();
  const { type } = useParams<{ type: 'upcoming' | 'past' }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get('page')) || 1;

  // api 통합
  const { data, isLoading } = useGetMyReservations<
    typeof type extends 'upcoming' ? ReservationMenteeItem : PastReservationItem
  >(type, page);
  const handlePageChange = (newPage: number) => {
    router.push(`/my/reservations/${type}?page=${newPage}`);
  };
  const sessionTap = [
    {
      link: '/my/reservations/upcoming?page=1',
      name: '예정된 세션',
      type: 'upcoming',
    },
    { link: '/my/reservations/past?page=1', name: '지난 세션', type: 'past' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<
    string | null
  >(null);

  const handleReview = (id: string) => {
    setSelectedReservationId(id);
    setIsOpen(true);
  };
  const handleMentoring = (id: string) => {};

  const { mutate: postReview } = usePostReview();
  const onSubmit = (data: ReviewRequest) => {
    const item = { ...data, reservationId: selectedReservationId as string };
    postReview(item, {
      onSuccess: () => {
        showToast('리뷰 작성을 완료했습니다.', 'success');
        setIsOpen(false);
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : '오류가 발생했습니다.';
        showToast(errorMessage, 'error');
      },
    });
  };

  if (isLoading) return null;

  return (
    <section className="flex-1">
      <h4 className="mb-6 text-2xl font-bold text-[var(--text-bold)]">
        멘토링 일정
      </h4>
      <div className="flex gap-2.5">
        {sessionTap.map((item) => (
          <Button
            key={item.name}
            size="lg"
            variant={type === item.type ? 'solid' : 'outline'}
            onClick={() => router.push(item.link)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      {data?.data.length ? (
        <>
          <ul>
            {data?.data.map((item) => (
              <ReservationCard
                key={item.id}
                item={item}
                type={type}
                onClick={
                  type === 'past'
                    ? (id) => handleReview(id)
                    : (id) => handleMentoring(id)
                }
              />
            ))}
          </ul>
          <Pagination
            page={page}
            totalPages={data?.totalPage || 1}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <p className="flex h-[calc(100vh-280px)] w-full items-center justify-center text-[var(--text-sub)]">
          {type === 'past'
            ? '종료된 세션이 없습니다.'
            : '예정된 세션이 없습니다.'}
        </p>
      )}

      {isOpen && selectedReservationId && (
        <ReviewForm onSubmit={onSubmit} onClose={() => setIsOpen(false)} />
      )}
    </section>
  );
}
