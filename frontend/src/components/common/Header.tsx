'use client';
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import Logo from '@/assets/logo.svg';
import { useToastStore } from '@/stores/useToast';
import Image from 'next/image';
import Button from './Button';
import useClickOutside from '@/hooks/useClickOutside';

export default function Header() {
  const { showToast } = useToastStore();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const mainNav = [
    { href: '/mentors', name: '멘토 찾기' },
    { href: '/schedule', name: '멘토링 일정' },
    { href: '/articles', name: '아티클' },
  ];

  const menteeItem = [
    { name: '멘토링 일정', href: '/my/reservations' },
    { name: '내가 쓴 후기', href: '/my/reviews' },
    { name: '결제 내역', href: '/my/payments' },
  ];

  const mentorItem = [
    { name: '세션 만들기', href: '/my/sessions' },
    { name: '예약 확인', href: '/my/schedule' },
    { name: '후기 모아보기', href: '/my/reviews/manage' },
    { name: '내 수익', href: '/my/earnings' },
  ];
  // 로그아웃
  const handleLogout = async () => {
    try {
      signOut({
        redirect: false,
        callbackUrl: '/',
      });
      showToast('로그아웃을 완료했습니다.', 'success');
      setOpen(false);
    } catch {
      showToast('로그아웃에 실패했습니다.', 'error');
    }
  };

  // 팝업 닫기
  const openRef = useRef<HTMLLIElement>(null);
  useClickOutside(openRef, () => setOpen(false));
  return (
    <header className="border-b border-[var(--border-color)]">
      <div className="mx-auto flex w-full items-center justify-between px-5 py-3 md:px-8 lg:w-[1200px] lg:px-0">
        <div className="flex items-center gap-6 lg:gap-16">
          <Link href="/" className="block">
            <Logo />
          </Link>

          <nav className="hidden lg:block">
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
        </div>

        <div className="flex items-center lg:gap-2">
          <button
            className="text-2xl lg:hidden"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <ul className="hidden items-center lg:flex">
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
            {session ? (
              <li className="relative ml-2" ref={openRef}>
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center justify-center overflow-hidden rounded-full text-2xl"
                >
                  <Image
                    src={session.user.image ?? '/icon/IcPeople.avif'}
                    alt={session.user.name}
                    width={30}
                    height={30}
                  />
                </button>
                {open && (
                  <div className="absolute top-[44px] right-0 z-200 box-border flex w-[280px] flex-col overflow-hidden rounded-xl bg-[var(--background)] shadow-2xl transition-transform">
                    <div className="border-b border-[var(--border-color)] px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <Image
                          src={session.user.image ?? '/icon/IcPeople.avif'}
                          alt={session.user.name}
                          width={40}
                          height={40}
                          className="overflow-hidden rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-[var(--text-bold)]">
                            {session.user.nickname}
                          </p>
                          <p className="truncate text-sm">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="larges"
                        className="mt-3 h-10"
                        onClick={() => {
                          setOpen(false);
                          router.push('/mypage');
                        }}
                      >
                        프로필 설정
                      </Button>
                    </div>
                    <ul className="flex flex-col text-sm">
                      {(session.user.role === 'mentee'
                        ? menteeItem
                        : mentorItem
                      ).map((item) => (
                        <li key={item.name}>
                          <Link
                            onClick={() => setOpen(false)}
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
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-white px-5 pt-6 pb-6 shadow-xl lg:hidden">
          <div className="mb-6 flex items-center justify-between">
            {session ? (
              <div className="flex items-center gap-3">
                <Image
                  src={session.user.image ?? '/icon/IcPeople.avif'}
                  alt="프로필"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="text-sm font-semibold">
                  {session.user.nickname}
                </span>
              </div>
            ) : (
              <Link href="/" className="block">
                <Logo />
              </Link>
            )}
            <button onClick={() => setIsMenuOpen(false)}>
              <FiX size={24} />
            </button>
          </div>

          <nav>
            <ul className="flex flex-col gap-4">
              {mainNav.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-sm font-medium text-[var(--text)] hover:text-[var(--primary)]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 인증 or 메뉴 리스트 */}
          {!session ? (
            <div className="mt-8 flex gap-3">
              <Link
                href="/login"
                className="h-10 flex-1 rounded border border-[var(--border-color)] bg-transparent text-center text-sm leading-10 text-[var(--text)] hover:bg-[var(--primary-sub01)] hover:text-white"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="h-10 flex-1 rounded bg-[var(--primary-sub01)] text-center text-sm leading-10 text-white hover:bg-[var(--primary)]"
              >
                회원가입
              </Link>
            </div>
          ) : (
            <div className="mt-8">
              <ul className="flex flex-col gap-2 text-sm">
                {(session.user?.role === 'mentee'
                  ? menteeItem
                  : mentorItem
                ).map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-2 text-[var(--text)] hover:text-[var(--primary)]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="mt-4 border-t border-[var(--border-color)] pt-4">
                  <button
                    onClick={handleLogout}
                    className="block w-full py-2 text-left text-[var(--text)] hover:text-[var(--primary)]"
                  >
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function Divider() {
  return (
    <div className="flex h-3.5 w-px flex-shrink-0 bg-[var(--border-color)]" />
  );
}
