import z from 'zod';

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;

export const reservationSchema = z.object({
  date: z.string().min(1, '날짜를 선택해 주세요'),
  timeSlot: z.object({
    startTime: z
      .string()
      .regex(timeRegex, '시작 시간 형식이 올바르지 않습니다. (HH:mm)'),
    endTime: z
      .string()
      .regex(timeRegex, '종료 시간 형식이 올바르지 않습니다. (HH:mm)'),
  }),
  question: z
    .string()
    .min(1, '멘토님에게 남길 메시지를 입력해주세요.')
    .max(500),
});

export type ReservationForm = z.infer<typeof reservationSchema>;
