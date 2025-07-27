'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUserQuery } from '@/hooks/query/useUserQuery';
import { FiSearch } from 'react-icons/fi';
import Logo from '@/assets/logo.svg';
import { useAuthStore } from '@/stores/useAuthStore';
import { logoutUser } from '@/libs/login';
import { useToastStore } from '@/stores/useToast';
import Image from 'next/image';
import Button from './Button';
import useClickOutside from '@/hooks/useClickOutside';

export default function Header() {
  const { showToast } = useToastStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { data: user } = useUserQuery();
  const { accessToken, resetToken } = useAuthStore();

  const mainNav = [
    { href: '/mentors', name: '멘토 찾기' },
    { href: '/schedule', name: '멘토링 일정' },
    { href: '/articles', name: '아티클' },
  ];

  const menteeItem = [
    { name: '멘토링 일정', href: '/schedule' },
    { name: '후기 관리', href: '/reviews' },
    { name: '결제/환불', href: '/payments' },
  ];

  const mentorItem = [
    { name: '스케줄 관리', href: '/my/schedule' },
    { name: '세션 관리', href: '/my/sessions' },
    { name: '후기 관리', href: '/my/reviews' },
    { name: '수입 내역', href: '/my/earnings' },
  ];

  // 로그아웃
  const handleLogout = async () => {
    try {
      await logoutUser();
      resetToken();
      showToast('로그아웃을 완료했습니다.', 'success');
      router.push('/');
    } catch {
      showToast('로그아웃에 실패했습니다.', 'error');
    }
  };

  // 팝업 닫기
  const openRef = useRef<HTMLLIElement>(null);
  useClickOutside(openRef, () => setOpen(false));
  return (
    <header className="border-b border-[var(--border-color)]">
      <div className="mx-auto flex items-center justify-between md:w-[768px] lg:w-[1200px]">
        <nav className="flex lg:gap-16 lg:py-5">
          <Link href="/" className="block">
            <Logo />
          </Link>
          <ul className="flex gap-8">
            {mainNav.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-[var(--text-sub)] hover:text-[var(--primary)]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex items-center">
          <li className="mx-2">
            <button
              type="button"
              className="flex h-6 w-6 items-center justify-center text-lg"
            >
              <FiSearch />
            </button>
          </li>
          <Divider />
          <li className="mx-2">
            <Link
              href="/mentor"
              className="block h-9 w-20 rounded text-center text-sm leading-9 hover:bg-[var(--primary-sub02)]"
            >
              멘토 모집
            </Link>
          </li>
          <Divider />
          {accessToken && user ? (
            <li className="relative ml-2" ref={openRef}>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center justify-center overflow-hidden rounded-full text-2xl"
              >
                <Image
                  src={user.image ?? '/icon/IcPeople.avif'}
                  alt={user.name}
                  width={30}
                  height={30}
                />
              </button>
              {open && (
                <div className="absolute top-[44px] right-0 z-200 box-border flex w-[280px] flex-col overflow-hidden rounded-xl bg-[var(--background)] shadow-2xl transition-transform">
                  <div className="border-b border-[var(--border-color)] px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <Image
                        src={user.image ?? '/icon/IcPeople.avif'}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="overflow-hidden rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-[var(--text-bold)]">
                          {user.nickname}
                        </p>
                        <p className="truncate text-sm">{user.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="larges"
                      className="mt-3 h-10"
                      onClick={() => router.push('/mypage')}
                    >
                      프로필수정
                    </Button>
                  </div>
                  <ul className="flex flex-col text-sm">
                    {user.role === 'mentee' &&
                      menteeItem.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block px-6 py-4 text-[var(--text)] hover:bg-[var(--primary-sub02)] hover:text-[var(--primary)]"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    {user.role === 'mentor' &&
                      mentorItem.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="block px-6 py-4 text-[var(--text)] hover:bg-[var(--primary-sub02)] hover:text-[var(--primary)]"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}

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
          ) : (
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
          )}
        </ul>
      </div>
    </header>
  );
}

function Divider() {
  return (
    <div className="flex h-3.5 w-px flex-shrink-0 bg-[var(--border-color)]" />
  );
}
