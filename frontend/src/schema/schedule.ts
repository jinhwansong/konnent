import z from 'zod';
import { DayOfWeek } from '@/contact/schedule';

export const reasonSchema = z.object({
  rejectReason: z.string().min(1, '거절 사유는 필수입니다.').max(1000),
});

export type ReasonForm = z.infer<typeof reasonSchema>;

const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

export const scheduleSchema = z.object({
  data: z
    .array(
      z.object({
        id: z.string().optional(), // DB에서 내려올 수도 있으니까 optional
        dayOfWeek: z.nativeEnum(DayOfWeek),
        startTime: z
          .string()
          .regex(timeRegex, '올바른 시간 형식이 아닙니다. (HH:mm)'),
        endTime: z
          .string()
          .regex(timeRegex, '올바른 시간 형식이 아닙니다. (HH:mm)'),
      }),
    )
    .min(1, '최소 1개 이상의 스케줄을 추가해야 합니다.')
    .refine(
      (items) =>
        items.every(
          (item) =>
            !item.startTime || !item.endTime || item.endTime > item.startTime,
        ),
      {
        message: '종료 시간은 시작 시간보다 늦어야 합니다.',
        path: ['endTime'],
      },
    ),
});

export type ScheduleFormValues = z.infer<typeof scheduleSchema>;
