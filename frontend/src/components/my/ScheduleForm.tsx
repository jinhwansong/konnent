'use client';
import React, { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { ScheduleRequest } from '@/types/schedule';
import { DayOfWeek, TIME_OPTIONS, WEEK_OPTIONS } from '@/contact/schedule';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Select from '../common/Select';
import { useRouter } from 'next/navigation';

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
  const methods = useForm<ScheduleRequest>({
    mode: 'all',
    defaultValues: defaultValues ?? {
      data: [{ dayOfWeek: DayOfWeek.MONDAY, startTime: '', endTime: '' }],
    },
  });
  const {
    formState: { isValid },
    control,
    getValues,
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
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col gap-2.5"
        >
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-2.5">
              <Select
                name={`data.${index}.dayOfWeek`}
                placeholder="요일"
                options={WEEK_OPTIONS}
                className="w-[100px]"
              />

              <Select
                name={`data.${index}.startTime`}
                options={TIME_OPTIONS}
                placeholder="시작 시간"
                className="w-[120px]"
                rules={{ required: '시작 시간을 선택해주세요.' }}
              />

              <Select
                name={`data.${index}.endTime`}
                options={TIME_OPTIONS}
                placeholder="종료 시간"
                className="w-[120px]"
                rules={{
                  required: '종료 시간을 선택해주세요.',
                  validate: (value) => {
                    const start = getValues(`data.${index}.startTime`);
                    return (
                      !start ||
                      value > start ||
                      '종료 시간은 시작 시간보다 늦어야 합니다.'
                    );
                  },
                }}
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
