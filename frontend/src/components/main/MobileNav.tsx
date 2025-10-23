'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { HiX } from 'react-icons/hi';

import { useGetUnreadCount } from '@/hooks/query/useNotification';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const mainNav = [
  { href: '/mentors', name: '멘토 찾기' },
  { href: '/schedule', name: '멘토링 일정' },
  { href: '/articles', name: '아티클' },
];

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { data: session } = useSession();
  const { data: getUnreadCount } = useGetUnreadCount();
  const unreadCount = getUnreadCount?.count ?? 0;

  // 모바일 메뉴가 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      
      {/* 모바일 메뉴 */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[var(--background)] shadow-xl lg:hidden">
        <div className="flex h-full flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between border-b border-[var(--border-color)] px-6 py-4">
            <h2 className="text-lg font-semibold text-[var(--text-bold)]">메뉴</h2>
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--text-sub)] hover:text-[var(--text)] hover:bg-[var(--hover-bg)] transition-colors duration-200"
              onClick={onClose}
            >
              <span className="sr-only">메뉴 닫기</span>
              <HiX className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="flex-1 px-6 py-6">
            <ul className="space-y-2">
              {mainNav.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-medium text-[var(--text)] rounded-lg hover:bg-[var(--hover-bg)] hover:text-[var(--text-bold)] transition-colors duration-200"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 사용자 섹션 */}
          <div className="border-t border-[var(--border-color)] px-6 py-6">
            {session ? (
              <div className="space-y-4">
                {/* 알림 */}
                <Link
                  href="/notifications"
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-[var(--text)] rounded-lg hover:bg-[var(--hover-bg)] hover:text-[var(--text-bold)] transition-colors duration-200"
                  onClick={onClose}
                >
                  <span>알림</span>
                  {unreadCount > 0 && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-[var(--color-danger)] rounded-full min-w-[20px] h-5">
                      {unreadCount}
                    </span>
                  )}
                </Link>

                {/* 프로필 */}
                <Link
                  href="/my/profile"
                  className="flex items-center px-4 py-3 text-sm font-medium text-[var(--text)] rounded-lg hover:bg-[var(--hover-bg)] hover:text-[var(--text-bold)] transition-colors duration-200"
                  onClick={onClose}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[var(--primary-sub02)] rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-[var(--text-sub)]">
                        {session.user.nickname?.[0] || session.user.name?.[0] || 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{session.user.nickname || session.user.name}</p>
                      <p className="text-sm text-[var(--text-sub)]">{session.user.email}</p>
                    </div>
                  </div>
                </Link>

                {/* 로그아웃 */}
                <button
                  type="button"
                  className="w-full px-4 py-3 text-sm font-medium text-[var(--color-danger)] rounded-lg hover:bg-[var(--primary-sub02)] transition-colors duration-200"
                  onClick={() => {
                    // 로그아웃 로직은 UserMenu에서 가져와야 함
                    onClose();
                  }}
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block w-full px-4 py-3 text-sm font-medium text-center text-[var(--text)] bg-[var(--hover-bg)] rounded-lg hover:bg-[var(--primary-sub02)] transition-colors duration-200"
                  onClick={onClose}
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="block w-full px-4 py-3 text-sm font-medium text-center text-white bg-[var(--primary)] rounded-lg hover:bg-[var(--primary-sub01)] transition-colors duration-200"
                  onClick={onClose}
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
