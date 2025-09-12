'use client';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import {
  duplicateEmail,
  duplicateNickname,
  registerUser,
  sendEmailVerification,
  verifyEmailCode,
} from '@/libs/register';
import { useToastStore } from '@/stores/useToast';
import { JoinInterface } from '@/types/user';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { SignForm, signSchema } from '@/schema/sign';
import { zodResolver } from '@hookform/resolvers/zod';
import FormErrorMessage from '@/components/common/FormErrorMessage';

export default function SignPage() {
  const router = useRouter();
  const { showToast } = useToastStore();
  const methods = useForm<SignForm>({
    mode: 'all',
    resolver: zodResolver(signSchema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      nickname: '',
      phone: '',
      code: '',
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = methods;

  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const email = watch('email');
  const nickname = watch('nickname');
  const code = watch('code');

  const onSubmit = async (data: JoinInterface) => {
    const { email, nickname, password, name, phone } = data;
    try {
      await registerUser({ email, nickname, password, name, phone });
      showToast('회원가입을 완료햤습니다.', 'success');
      router.push('/login');
    } catch {
      showToast('회원가입에 실패했습니다.', 'error');
    }
  };

  // 이메일 중복검사
  const checkEmailDuplicate = async () => {
    try {
      await duplicateEmail(email);
      showToast('사용 가능한 이메일입니다.', 'success');
      setIsDuplicateChecked(true);
      setIsCodeSent(false);
      setIsVerified(false);
    } catch {
      showToast('이미 사용 중인 이메일입니다.', 'error');
    }
  };

  // 닉네임 중복검사
  const checkNicknameDuplicate = async () => {
    try {
      await duplicateNickname(nickname);
      showToast('사용 가능한 닉네임입니다.', 'success');
    } catch {
      showToast('이미 사용 중인 닉네임입니다.', 'error');
    }
  };

  // 이메일 인증 코드 전송
  const handleSendCode = async () => {
    try {
      await sendEmailVerification({ email });
      showToast('인증 코드가 전송되었습니다.', 'success');
      setIsCodeSent(true);
      setTimeLeft(180);
    } catch {
      showToast('이메일 전송 실패', 'error');
    }
  };

  // 인증 코드 검증
  const handleVerifyCode = async () => {
    try {
      await verifyEmailCode({ email, code });
      showToast('이메일 인증이 완료되었습니다.', 'success');
      setIsVerified(true);
    } catch {
      showToast('이메일 인증이 실패했습니다.', 'error');
    }
  };

  // 이메일 수정 시 인증 상태 초기화
  useEffect(() => {
    setIsDuplicateChecked(false);
    setIsCodeSent(false);
    setIsVerified(false);
  }, [email]);

  // 타이머
  useEffect(() => {
    if (!isCodeSent || isVerified) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          showToast('인증 코드가 만료되었습니다.', 'error');
          setIsCodeSent(false);
          setIsDuplicateChecked(false); // 다시 중복확인부터
          setTimeLeft(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCodeSent, isVerified, showToast]);

  const isFormReady =
    isValid && isDuplicateChecked && isVerified && email && nickname;

  return (
    <section className="mx-auto mt-10 mb-16 w-[380px]">
      <h4 className="mb-5 text-center text-xl font-bold text-[var(--text-bold)]">
        <span className="text-[var(--primary)]">멘토링 여정</span>, 지금
        시작해보세요
      </h4>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col gap-5"
        >
          {/* 이메일 */}
          <div className="relative flex flex-col gap-2">
            <label className="text-sm">이메일</label>
            <Input
              {...register('email')}
              placeholder="이메일을 입력해주세요."
              type="text"
            />
            <FormErrorMessage message={errors.email?.message} />
            <button
              className="absolute top-8 right-1 bg-[var(--background)] px-2.5 py-2.5 text-sm text-[var(--primary)] disabled:text-[var(--text-sub)]"
              disabled={!email || !!errors.email}
              type="button"
              onClick={checkEmailDuplicate}
            >
              중복확인
            </button>
          </div>
          {/* 인증 코드 */}
          {isDuplicateChecked && (
            <div className="relative flex flex-col gap-2">
              <label className="text-sm text-[var(--text-bold)]">
                인증 코드
              </label>
              <Input
                {...register('code')}
                placeholder="인증코드를 입력해주세요"
                type="text"
              />
              <FormErrorMessage message={errors.code?.message} />
              <button
                type="button"
                onClick={
                  isVerified
                    ? undefined
                    : isCodeSent
                      ? handleVerifyCode
                      : handleSendCode
                }
                className="absolute top-8 right-1 bg-[var(--background)] px-2.5 py-2.5 text-sm text-[var(--primary)] disabled:text-[var(--text-sub)]"
                disabled={!email || !!errors.email || isVerified}
              >
                {isVerified ? '인증완료' : isCodeSent ? '인증하기' : '코드전송'}
              </button>
              {isCodeSent && !isVerified && (
                <p className="mt-1 text-xs text-red-500">
                  {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, '0')} 내에
                  인증해주세요
                </p>
              )}
            </div>
          )}

          {/* 비밀번호 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm">비밀번호</label>
            <Input
              {...register('password')}
              type="password"
              placeholder="비밀번호를 입력해주세요."
            />
            <FormErrorMessage message={errors.password?.message} />
          </div>

          {/* 비밀번호 확인 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm">비밀번호 확인</label>
            <Input
              {...register('passwordConfirm')}
              type="password"
              placeholder="비밀번호를 다시 입력해주세요."
            />
            <FormErrorMessage message={errors.passwordConfirm?.message} />
          </div>

          {/* 이름 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm">이름</label>
            <Input
              {...register('name')}
              placeholder="이름을 입력해주세요."
              type="text"
            />
            <FormErrorMessage message={errors.name?.message} />
          </div>

          {/* 닉네임 */}
          <div className="relative flex flex-col gap-2">
            <label className="text-sm">닉네임</label>
            <Input
              {...register('nickname')}
              placeholder="닉네임을 입력해주세요."
              type="text"
            />
            <FormErrorMessage message={errors.nickname?.message} />
            <button
              type="button"
              className="absolute top-8 right-1 bg-[var(--background)] px-2.5 py-2.5 text-sm text-[var(--primary)] disabled:text-[var(--text-sub)]"
              disabled={!nickname || !!errors.nickname}
              onClick={checkNicknameDuplicate}
            >
              중복확인
            </button>
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-2">
            <label className="text-sm">전화번호</label>
            <Input
              {...register('phone')}
              placeholder="전화번호를 입력해주세요."
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={11}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  '',
                );
              }}
            />
            <FormErrorMessage message={errors.phone?.message} />
          </div>
          <Button type="submit" disabled={!isFormReady}>
            회원가입
          </Button>
        </form>
      </FormProvider>
    </section>
  );
}
