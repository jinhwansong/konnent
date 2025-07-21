import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { IcGoogle, IcKakao, IcNaver } from '@/assets';

interface ISocial {
  text: string;
}

export default function Social({ text }: ISocial) {
  const router = useRouter();
  const onSocial = useCallback(
    (sns: string) => {
      if (sns === 'kakao') {
        router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/kakao`);
      }
      if (sns === 'naver') {
        router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/naver`);
      }
      if (sns === 'google') {
        router.push(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/google`,
        );
      }
    },
    [router],
  );
  return (
    <div className="flex flex-col items-center">
      <hr className="relative -bottom-2 m-0 block h-px w-full border-none bg-[var(--border-color)]" />
      <span className="relative mb-4 bg-[var(--background)] px-2 text-xs">
        간편{text}
      </span>
      <div className="flex w-full flex-col gap-4">
        <button
          type="button"
          onClick={() => onSocial('kakao')}
          className="flex h-[50px] w-full items-center justify-center rounded-[5px] bg-[#FAE500] text-sm font-bold"
        >
          <IcKakao />
          <span className="ml-2">카카오로 {text}</span>
        </button>

        <button
          type="button"
          onClick={() => onSocial('naver')}
          className="flex h-[50px] w-full items-center justify-center rounded-[5px] bg-[#1EC800] text-sm font-bold text-white"
        >
          <IcNaver />
          <span className="ml-2">네이버로 {text}</span>
        </button>

        <button
          type="button"
          onClick={() => onSocial('google')}
          className="flex h-[50px] w-full items-center justify-center rounded-[5px] bg-[#f8f8f8] text-sm font-bold"
        >
          <IcGoogle />
          <span className="ml-2">구글로 {text}</span>
        </button>
      </div>
    </div>
  );
}
