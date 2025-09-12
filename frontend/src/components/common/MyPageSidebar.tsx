'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import ConfirmDialog from './ConfirmDialog';
import { deleteProfile } from '@/libs/mypage';
import { signOut } from 'next-auth/react';
import { useToastStore } from '@/stores/useToast';

export default function MyPageSidebar() {
  const { data: session } = useSession();
  const { showToast } = useToastStore();

  const commonItem = [
    {
      title: '내 정보',
      items: [{ name: '프로필 설정', href: '/my/profile' }],
    },
    {
      title: '이용 내역',
      items: [
        { name: '멘토링 일정', href: '/my/reservations/upcoming' },
        { name: '내가 쓴 후기', href: '/my/reviews' },
        { name: '결제 내역', href: '/my/payments' },
      ],
    },
  ];

  const mentorExtra = [
    {
      title: '멘토링 관리',
      items: [
        { name: '세션 만들기', href: '/my/sessions' },
        { name: '예약 확인', href: '/my/schedule' },
        { name: '후기 모아보기', href: '/my/review-manage' },
        { name: '내 수익', href: '/my/earnings' },
      ],
    },
  ];
  const menteeItem = [...commonItem];
  const mentorItem = [...commonItem, ...mentorExtra];
  const pathname = usePathname();
  const tabs = session?.user?.role === 'mentor' ? mentorItem : menteeItem;

  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteProfile();
      showToast(res.message, 'success');
      setOpen(false);

      signOut({
        callbackUrl: '/',
      });
    } catch {
      showToast('회원탈퇴 중 오류가 발생했습니다.', 'error');
    }
  };
  return (
    <aside className="w-[200px]">
      {tabs.map((section) => (
        <div key={section.title} className="mb-6">
          <h2 className="mb-2 text-sm font-semibold text-[var(--text-bold)]">
            {section.title}
          </h2>
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={clsx(
                    'block w-full rounded-md px-3 py-2 text-sm text-[var(--text)]',
                    pathname.includes(item.href)
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'hover:bg-[var(--primary-sub02)] hover:text-[var(--primary)]',
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button
        className={clsx(
          'w-full text-sm font-medium',
          'text-red-500 hover:text-red-600',
        )}
        onClick={() => setOpen(true)}
      >
        회원탈퇴
      </button>
      <ConfirmDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
        title="정말 회원탈퇴 하시겠습니까?"
        description="탈퇴 후에는 계정을 복구할 수 없으며, 모든 데이터가 삭제됩니다."
        confirmText="탈퇴하기"
        cancelText="취소"
      />
    </aside>
  );
}
