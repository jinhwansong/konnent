'use client';
import React from 'react';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import Social from '@/components/common/Social';

import { LoginRequest } from '@/types/user';
import { input } from '@/contact/login';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

export default function LoginPage() {
  const methods = useForm<LoginRequest>({
    mode: 'all',
    defaultValues: { email: '', password: '' },
  });
  const onSubmit = (data: LoginRequest) => {
    console.log('FormData:', data);
  };

  return (
    <article className="mx-auto mt-10 mb-16 w-[23.75rem]">
      <h4 className="mb-5 text-center text-xl font-bold text-[var(--text-bold)]">
        커넥트 시작하기
      </h4>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col gap-5"
        >
          {input.map((item) => (
            <div key={item.name} className="flex flex-col gap-2">
              <Input
                name={item.name}
                type={item.type}
                placeholder={item.placeholder}
                rules={item.rules}
              />
            </div>
          ))}

          <Button type="submit">로그인</Button>
        </form>
      </FormProvider>
      <div className="mt-5 mb-7 flex justify-center text-xs font-medium">
        <Link href="/id" className="border-r border-[var(--border-color)] px-4">
          아이디 찾기
        </Link>
        <Link
          href="/password"
          className="border-r border-[var(--border-color)] px-4"
        >
          비밀번호 찾기
        </Link>
        <Link href="/signup/terms" className="px-4">
          회원가입
        </Link>
      </div>
      <Social text="로그인" />
    </article>
  );
}
