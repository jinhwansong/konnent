'use client';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import clsx from 'clsx';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Textarea from '../common/Textarea';
import {
  ReviewMenteeItem,
  ReviewMentorItem,
  ReviewRequest,
} from '@/types/review';
import { FaStar } from 'react-icons/fa';

interface ReviewFormProp {
  selectedReview?: ReviewMenteeItem | ReviewMentorItem;
  onSubmit: (data: ReviewRequest) => void;
  onClose: () => void;
}
const ratingLabels: Record<number, string> = {
  1: '별로였어요',
  2: '아쉬워요',
  3: '보통이에요',
  4: '좋았어요',
  5: '최고였어요',
};

export default function ReviewForm({
  onSubmit,
  selectedReview,
  onClose,
}: ReviewFormProp) {
  const methods = useForm<ReviewRequest>({
    mode: 'all',
    defaultValues: selectedReview ?? {
      content: '',
      rating: 0,
    },
  });
  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { isValid, errors },
  } = methods;
  const rating = watch('rating');
  return (
    <Modal onClose={onClose}>
      <h4 className="mb-5 text-xl leading-[1.4] font-semibold tracking-[-0.3px] text-[var(--text-bold)]">
        리뷰 작성
      </h4>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-6 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() =>
                    setValue('rating', star, { shouldValidate: true })
                  }
                  className="transition-transform hover:scale-110"
                >
                  <FaStar
                    size={35}
                    className={clsx(
                      'transition-colors',
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300',
                    )}
                  />
                </button>
              ))}
            </div>
            <input
              type="hidden"
              {...register('rating', { min: 1, required: true })}
            />
            {errors.rating && (
              <p className="mt-1 text-sm text-red-500">별점을 선택해주세요.</p>
            )}
            <p className="font-medium transition-colors">
              {rating > 0 ? ratingLabels[rating] : '별점을 선택해주세요'}
            </p>
          </div>

          <Textarea
            placeholder="멘토링 리뷰를 입력해주세요"
            maxLength={1000}
            className="h-[200px]"
            rules={{ required: '리뷰는 필수입니다.' }}
            name="content"
          />
          <div className="mt-5 flex gap-2.5">
            <Button variant="outline" onClick={onClose} type="button">
              취소
            </Button>
            <Button type="submit" disabled={!isValid}>
              {isValid ? '작성하기' : '작성 중...'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
