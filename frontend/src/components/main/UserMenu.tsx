'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useRef, useState } from 'react';

import useClickOutside from '@/hooks/useClickOutside';
import { removeFcm } from '@/libs/notification';
import { useToastStore } from '@/stores/useToast';
import { buildImageUrl } from '@/utils/helpers';

import Button from '../common/Button';

export default function UserMenu() {
  const { data: session } = useSession();
  const { show } = useToastStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const openRef = useRef<HTMLLIElement>(null);

  useClickOutside(openRef, () => setOpen(false));

  const menteeItem = [
    { name: '멘토링 일정', href: '/my/reservations/upcoming' },
    { name: '내가 쓴 후기', href: '/my/reviews' },
    { name: '결제 내역', href: '/my/payments' },
  ];

  const mentorItem = [
    { name: '세션 만들기', href: '/my/sessions' },
    { name: '예약 확인', href: '/my/schedule' },
    { name: '후기 모아보기', href: '/my/review-manage' },
    { name: '내 수익', href: '/my/earnings' },
  ];

  const handleLogout = async () => {
    try {
      const fcm = session?.user?.fcm;
      if (fcm) await removeFcm(fcm);

      await signOut({ callbackUrl: '/' });
      show('로그아웃을 완료했습니다.', 'success');
    } catch {
      show('로그아웃에 실패했습니다.', 'error');
    }
  };

  // 로그인 안 된 경우 → 버튼들
  if (!session) {
    return (
      <>
        <li className="mr-1 ml-2">
          <Link
            href="/login"
            className="block h-9 w-20 rounded text-center text-sm leading-9 hover:bg-[var(--primary-sub02)]"
          >
            로그인
          </Link>
        </li>
        <li>
          <Link
            href="/signup"
            className="block h-9 w-20 rounded bg-[var(--primary-sub01)] text-center text-sm leading-9 text-white hover:bg-[var(--primary)]"
          >
            회원가입
          </Link>
        </li>
      </>
    );
  }

  // 로그인 된 경우 → 프로필 드롭다운
  return (
    <li className="relative ml-2" ref={openRef}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center justify-center overflow-hidden rounded-full text-2xl"
      >
        <Image
          src={buildImageUrl(session?.user.image?.trim())}
          alt={session.user.name}
          width={30}
          height={30}
          className="h-8 w-8 object-cover"
        />
      </button>

      {open && (
        <div className="absolute top-[44px] right-0 z-200 box-border flex w-[280px] flex-col overflow-hidden rounded-xl bg-[var(--background)] shadow-2xl transition-transform">
          <div className="border-b border-[var(--border-color)] px-6 py-4">
            <div className="mb-3 flex items-center gap-3.5">
              <Image
                src={buildImageUrl(session?.user.image?.trim())}
                alt={session.user.name}
                width={40}
                height={40}
                className="h-10 w-10 overflow-hidden rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-[var(--text-bold)]">
                  {session.user.name}
                </p>
                <p className="truncate text-sm">{session.user.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="full-h"
              onClick={() => {
                setOpen(false);
                router.push('/my/profile');
              }}
            >
              프로필 설정
            </Button>
          </div>

          <ul className="flex flex-col text-sm">
            {(session.user.role === 'mentee' ? menteeItem : mentorItem).map(
              item => (
                <li key={item.name}>
                  <Link
                    onClick={() => setOpen(false)}
                    href={item.href}
                    className="block px-6 py-4 text-[var(--text)] hover:bg-[var(--primary-sub02)] hover:text-[var(--primary)]"
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}
            <li className="border-t border-[var(--border-color)]">
              <button
                onClick={handleLogout}
                className="block w-full px-6 py-4 text-[var(--text)] hover:bg-[var(--primary-sub02)] hover:text-[var(--primary)]"
              >
                로그아웃
              </button>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}
