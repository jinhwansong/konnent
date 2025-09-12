'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { IcGoogle, IcKakao, IcNaver } from '@/assets';
import clsx from 'clsx';
import { useToastStore } from '@/stores/useToast';
import { LoginRequest, loginSchema } from '@/schema/login';

export default function LoginPage() {
  const { showToast } = useToastStore();
  const router = useRouter();
  const methods = useForm<LoginRequest>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = methods;
  const onSubmit = async (data: LoginRequest) => {
    const { email, password } = data;
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.code) {
        showToast('이메일 또는 비밀번호가 잘못되었습니다.', 'error');
      } else {
        showToast('로그인에 성공했습니다.', 'success');
        router.push('/');
      }
    } catch {
      showToast('로그인에 실패했습니다.', 'error');
    }
  };
  const onSocial = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };
  const sns = [
    { name: 'kakao', value: '카카오', img: <IcKakao /> },
    { name: 'naver', value: '네이버', img: <IcNaver /> },
    { name: 'google', value: '구글', img: <IcGoogle /> },
  ];
  return (
    <section className="mx-auto mt-10 mb-16 w-[380px]">
      <h4 className="mb-5 text-center text-xl font-bold text-[var(--text-bold)]">
        커넥트 시작하기
      </h4>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="이메일을 입력해주세요."
              {...register('email')}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              {...register('password')}
            />
          </div>

          <Button type="submit" disabled={!isValid}>
            로그인
          </Button>
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
        <Link href="/signup" className="px-4">
          회원가입
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <hr className="relative -bottom-2 m-0 block h-px w-full border-none bg-[var(--border-color)]" />
        <span className="relative mb-4 bg-[var(--background)] px-2 text-xs">
          간편로그인
        </span>
        <div className="flex w-full flex-col gap-4">
          {sns.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => onSocial(item.name)}
              className={clsx(
                'flex h-[50px] w-full items-center justify-center rounded-[5px] text-sm font-bold',
                item.name === 'kakao' && 'bg-[#FAE500] text-[#392020]',
                item.name === 'naver' && 'bg-[#1EC800] text-white',
                item.name === 'google' &&
                  'bg-[#f8f8f8] text-[var(--text-bold)]',
              )}
            >
              {item.img}
              <span className="ml-2">{item.value}로 로그인</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
