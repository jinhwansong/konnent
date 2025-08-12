'use client';
import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Calendar from 'react-calendar';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Modal from '../common/Modal';
import {
  useGetReservationsDays,
  useGetReservationsTime,
} from '@/hooks/query/useReservation';
import { useGetSessionDetail } from '@/hooks/query/useCommonSession';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import CheckboxGroup from '../common/CheckboxGroup';
import { ReservationRequest, Slot } from '@/types/reservation';
import { format, parse } from 'date-fns';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { useReservation } from '@/stores/useReservation';

enum Weekday {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export default function ReserveModal({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const { setReservation, reservation } = useReservation();
  const methods = useForm<ReservationRequest>({
    mode: 'onChange',
    defaultValues: {
      date: '',
      timeSlot: { startTime: '', endTime: '' },
      question: '',
    },
  });
  useEffect(() => {
    if (!reservation) return;
    methods.reset(
      {
        date: reservation.date,
        timeSlot: {
          startTime: reservation.timeSlot.startTime,
          endTime: reservation.timeSlot.endTime,
        },
        question: reservation.question ?? '',
      },
      { keepDirty: false, keepTouched: false },
    );
    methods.trigger();
  }, [reservation, methods]);
  const {
    formState: { isValid },
  } = methods;
  // 선택한 날짜
  const selectDate = methods.watch('date') || undefined;
  const { data: session, isLoading: sessionLoading } =
    useGetSessionDetail(sessionId);
  // 멘토가 설정한 요일
  const { data: reservationsDays } = useGetReservationsDays(
    session?.userId as string,
  );
  // 예약 가능한 시간
  const { data: reservationsTime, isLoading: timeLoading } =
    useGetReservationsTime(sessionId, selectDate as string);

  const slots = useMemo<Slot[]>(
    () => reservationsTime?.data ?? [],
    [reservationsTime?.data],
  );
  const slotOptions = useMemo(
    () =>
      slots.map((slot) => ({
        label: `${slot.startTime.slice(0, 5)} ~ ${slot.endTime.slice(0, 5)}`,
        value: JSON.stringify(slot),
      })),
    [slots],
  );

  // 예약이 가능한 날짜
  const enabledDayIndexes = reservationsDays?.data.map(
    (day) => Weekday[day as keyof typeof Weekday],
  );

  const isDateEnabled = (date: Date) => {
    const today = new Date();
    const isFuture = date >= new Date(today.setHours(0, 0, 0, 0));
    const isCorrectDay = enabledDayIndexes?.includes(date.getDay());
    return isFuture && isCorrectDay;
  };
  const onSubmit = (data: ReservationRequest) => {
    const slot = JSON.parse(data.timeSlot as unknown as string) as Slot;
    setReservation({
      ...data,
      timeSlot: slot,
      sessionId: session?.id as string,
      duration: session?.duration as number,
      sessionTitle: session?.title as string,
      mentorName: session?.nickname as string,
      amount: session?.price as number,
    });
    router.push(`/mentors/${sessionId}/confirm`);
  };
  if (sessionLoading) return null;
  return (
    <Modal link={`/mentors/${sessionId}`}>
      <h4 className="mb-5 text-xl leading-[1.4] font-semibold tracking-[-0.3px] text-[var(--text-bold)]">
        멘토링 예약
      </h4>
      <FormProvider {...methods}>
        <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
          <Controller
            name="date"
            rules={{ required: '날짜를 선택해 주세요' }}
            control={methods.control}
            render={({ field }) => (
              <Calendar
                value={
                  field.value
                    ? parse(field.value, 'yyyy-MM-dd', new Date())
                    : null
                }
                onChange={(d) =>
                  field.onChange(format(d as Date, 'yyyy-MM-dd'))
                }
                locale="ko-KR"
                calendarType="hebrew"
                tileDisabled={({ date }) => !isDateEnabled(date)}
                minDetail="month"
                maxDetail="month"
                prev2Label={null}
                next2Label={null}
                prevLabel={<IoIosArrowBack />}
                nextLabel={<IoIosArrowForward />}
                formatDay={(locale, date) => date.getDate().toString()}
                className="react-calendar"
              />
            )}
          />

          {selectDate && !timeLoading && slots.length > 0 && (
            <div className="mt-2 rounded-lg border border-[var(--border-color)] p-3">
              <CheckboxGroup
                className="grid grid-cols-3 gap-2 text-center"
                name="timeSlot"
                rules={{ required: '시간을 선택해 주세요' }}
                options={slotOptions}
                type="radio"
              />
            </div>
          )}
          <h4 className="mt-5 mb-2 text-sm">멘토님에게 남길 메시지</h4>
          <Textarea
            name="question"
            maxLength={600}
            className="h-32 w-full"
            placeholder="멘토님께 남길말을 적어주세요"
            rules={{
              required: '멘토님께 남길말을 적어주세요',
              maxLength: {
                value: 600,
                message: '최대 600자까지 입력 가능합니다',
              },
            }}
          />
          <Button type="submit" disabled={!isValid} className="mt-5">
            다음으로
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
