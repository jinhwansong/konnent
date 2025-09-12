'use client';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수 입력입니다.')
    .email('올바른 이메일 형식을 입력해주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/,
      '영문, 숫자, 특수문자를 포함해야 합니다.',
    ),
});

export type LoginRequest = z.infer<typeof loginSchema>;
