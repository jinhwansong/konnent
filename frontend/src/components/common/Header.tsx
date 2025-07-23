'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useUserQuery } from '@/hooks/user/useUserQuery';
import { FiSearch, FiUser } from 'react-icons/fi';
import Logo from '@/assets/logo.svg';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export default function Header() {
  const mainNav = [
    { href: '/mentors', name: '멘토 찾기' },
    { href: '/schedule', name: '멘토링 일정' },
    { href: '/articles', name: '아티클' },
  ];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { isAuthLoading } = useAuthStore();

  const { data: user } = useUserQuery();
  if (isAuthLoading) return null;
  // 로그아웃
  const handleLogout = () => {};
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
          <li className="mr-2">
            <button type="button">
              <FiSearch />
            </button>
          </li>
          <Divider />
          <li className="mr-1">
            <Link
              href="/mentor"
              className="block h-9 w-20 rounded text-center text-sm leading-9 hover:bg-[var(--primary-sub02)]"
            >
              멘토 모집
            </Link>
          </li>
          <Divider />
          {user ? (
            <>
              <li className="relative mr-2">
                <button onClick={() => setOpen((prev) => !prev)}>
                  <FiUser />
                </button>
                {open && (
                  <div className="absolute right-0 z-50 mt-2 w-52 rounded-md border bg-white shadow-md">
                    <div className="border-b px-4 py-3">
                      <p className="text-sm font-semibold">{user.nickname}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <ul className="flex flex-col text-sm">
                      <li
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => router.push('/mypage')}
                      >
                        마이페이지
                      </li>
                      <li
                        className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                        onClick={() => router.push('/account')}
                      >
                        계정 설정
                      </li>
                      <li
                        className="cursor-pointer border-t px-4 py-2 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        로그아웃
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="mr-1">
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
    <div className="mr-1 flex h-3.5 w-px flex-shrink-0 bg-[var(--border-color)]" />
  );
}
