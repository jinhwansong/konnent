'use client';
import z from 'zod';

export const phoneRegex = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/;
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
export const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
export const signSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식을 입력해주세요'),
    password: z
      .string()
      .regex(
        passwordRegex,
        '영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다',
      ),
    passwordConfirm: z.string(),
    name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
    nickname: z
      .string()
      .min(2, '닉네임은 2자 이상이어야 합니다.')
      .max(12, '닉네임은 12자 이하여야 합니다.')
      .regex(nicknameRegex, '한글, 영문, 숫자만 사용 가능합니다'),
    phone: z.string().regex(phoneRegex, '올바른 전화번호 형식을 입력해주세요'),
    code: z.string().min(1, '인증 코드를 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['passwordConfirm'],
  });

export type SignForm = z.infer<typeof signSchema>;
