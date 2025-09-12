'use client';
import React, { useEffect } from 'react';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { ScheduleRequest } from '@/types/schedule';
import { DayOfWeek, TIME_OPTIONS, WEEK_OPTIONS } from '@/contact/schedule';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Select from '../common/Select';
import { useRouter } from 'next/navigation';
import { ScheduleFormValues, scheduleSchema } from '@/schema/schedule';
import { zodResolver } from '@hookform/resolvers/zod';

interface ScheduleFormProps {
  onSubmit: (data: ScheduleRequest) => void;
  defaultValues?: ScheduleRequest;
  title: string;
}

export default function ScheduleForm({
  onSubmit,
  title,
  defaultValues,
}: ScheduleFormProps) {
  const router = useRouter();
  const methods = useForm<ScheduleFormValues>({
    mode: 'all',
    resolver: zodResolver(scheduleSchema),
    defaultValues: defaultValues ?? {
      data: [{ dayOfWeek: DayOfWeek.MONDAY, startTime: '', endTime: '' }],
    },
  });
  const {
    handleSubmit,
    formState: { isValid },
    control,
    reset,
  } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'data',
  });
  useEffect(() => {
    if (defaultValues?.data) {
      reset({
        data: defaultValues.data.map((item) => ({
          id: item.id,
          dayOfWeek: item.dayOfWeek as DayOfWeek,
          startTime: item.startTime.slice(0, 5),
          endTime: item.endTime.slice(0, 5),
        })),
      });
    }
  }, [defaultValues, reset]);

  return (
    <Modal onClose={() => router.back()}>
      <h4 className="mb-5 text-xl leading-[1.4] font-semibold tracking-[-0.3px] text-[var(--text-bold)]">
        {title}
        <button
          className="ml-4 text-sm font-light text-[var(--primary)]"
          type="button"
          onClick={() =>
            append({
              dayOfWeek: DayOfWeek.MONDAY,
              startTime: '',
              endTime: '',
            })
          }
        >
          + 스케줄 추가
        </button>
      </h4>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col gap-2.5"
        >
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-2.5">
              {/* 요일 */}
              <Controller
                name={`data.${index}.dayOfWeek`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={WEEK_OPTIONS}
                    placeholder="요일"
                    className="w-[100px]"
                  />
                )}
              />

              {/* 시작 시간 */}
              <Controller
                name={`data.${index}.startTime`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={TIME_OPTIONS}
                    placeholder="시작 시간"
                    className="w-[120px]"
                  />
                )}
              />

              {/* 종료 시간 */}
              <Controller
                name={`data.${index}.endTime`}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={TIME_OPTIONS}
                    placeholder="종료 시간"
                    className="w-[120px]"
                  />
                )}
              />
              <div className="ml-auto">
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant="danger"
                  size="sm"
                  className="h-[45px]"
                >
                  삭제
                </Button>
              </div>
            </div>
          ))}

          <Button type="submit" disabled={!isValid} className="mt-5">
            {title}
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}
