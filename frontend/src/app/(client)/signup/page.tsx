'use client';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
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

export default function SignPage() {
  const router = useRouter();
  const { showToast } = useToastStore();
  const methods = useForm<JoinInterface>({
    mode: 'all',
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
    formState: { errors, isValid },
  } = methods;
  const [email, nickname, password, passwordConfirm, name, phone, code] =
    useWatch({
      name: [
        'email',
        'nickname',
        'password',
        'passwordConfirm',
        'name',
        'phone',
        'code',
      ],
      control: methods.control,
    });

  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
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
  const sign = [
    {
      name: 'password',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요.',
      label: '비밀번호',
      rules: {
        required: '비밀번호는 필수 입력입니다.',
        pattern: {
          value:
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
          message: '영문, 숫자, 특수문자를 포함한 8자 이상이어야 합니다.',
        },
      },
    },
    {
      name: 'passwordConfirm',
      type: 'password',
      placeholder: '비밀번호를 다시 입력해주세요.',
      label: '비밀번호 확인',
      rules: {
        required: '비밀번호 확인은 필수 입력입니다.',
        validate: (value: string) => {
          return value === password || '비밀번호가 일치하지 않습니다.';
        },
      },
    },
    {
      name: 'name',
      type: 'text',
      placeholder: '이름을 입력해주세요.',
      label: '이름',
      rules: {
        required: '이름은 필수 입력입니다.',
        minLength: {
          value: 2,
          message: '이름은 2자 이상이어야 합니다.',
        },
      },
    },
    {
      name: 'nickname',
      type: 'text',
      placeholder: '닉네임을 입력해주세요.',
      label: '닉네임',
      rules: {
        required: '닉네임은 필수 입력입니다.',
        minLength: {
          value: 2,
          message: '닉네임은 2자 이상이어야 합니다.',
        },
        maxLength: {
          value: 12,
          message: '닉네임은 12자 이하여야 합니다.',
        },
      },
    },
    {
      name: 'phone',
      type: 'text',
      placeholder: '전화번호를 입력해주세요.',
      label: '전화번호',
      rules: {
        required: '전화번호는 필수 입력입니다.',
        pattern: {
          value: /^01[0-9]{1}?[0-9]{3,4}?[0-9]{4}$/,
          message: '올바른 전화번호 형식을 입력해주세요.',
        },
      },
    },
  ];

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

  // 회원가입 버튼 활성화
  const isFormReady =
    isValid &&
    isDuplicateChecked &&
    isVerified &&
    email &&
    password &&
    passwordConfirm &&
    name &&
    phone &&
    nickname;

  return (
    <section className="mx-auto mt-10 mb-16 w-[23.75rem]">
      <h4 className="mb-5 text-center text-xl font-bold text-[var(--text-bold)]">
        <span className="text-[var(--primary)]">멘토링 여정</span>, 지금
        시작해보세요
      </h4>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col gap-5"
        >
          <div className="relative flex flex-col gap-2">
            <label className="text-sm">이메일</label>
            <Input
              name="email"
              type="text"
              placeholder="이메일을 입력해주세요."
              rules={{
                required: '이메일은 필수 입력입니다.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식을 입력해주세요.',
                },
              }}
            />
            <button
              className="absolute top-8 right-1 bg-[var(--background)] px-2.5 py-2.5 text-sm text-[var(--primary)] disabled:text-[var(--text-sub)]"
              disabled={!email || !!errors.email}
              type="button"
              onClick={checkEmailDuplicate}
            >
              중복확인
            </button>
          </div>
          {isDuplicateChecked && (
            <div className="relative flex flex-col gap-2">
              <label className="text-sm">인증 코드</label>
              <Input
                name="code"
                type="text"
                placeholder="인증코드를 입력해주세요"
                rules={{ required: '인증 코드를 입력해주세요.' }}
              />
              <button
                type="button"
                onClick={async () => {
                  if (isVerified) return;

                  if (!isCodeSent) {
                    await handleSendCode();
                  } else {
                    await handleVerifyCode();
                  }
                }}
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

          {sign.map((item) => {
            const isNickname = item.label === '닉네임';
            const isDisabled = isNickname && (!nickname || !!errors.nickname);
            return (
              <div key={item.name} className="relative flex flex-col gap-2">
                <label className="text-sm">{item.label}</label>
                <Input
                  name={item.name}
                  type={item.type}
                  placeholder={item.placeholder}
                  rules={item.rules}
                />

                {isNickname && (
                  <button
                    className="absolute top-8 right-1 bg-[var(--background)] px-2.5 py-2.5 text-sm text-[var(--primary)] disabled:text-[var(--text-sub)]"
                    disabled={isDisabled}
                    type="button"
                    onClick={checkNicknameDuplicate}
                  >
                    중복확인
                  </button>
                )}
              </div>
            );
          })}
          <Button type="submit" disabled={!isFormReady}>
            회원가입
          </Button>
        </form>
      </FormProvider>
    </section>
  );
}
