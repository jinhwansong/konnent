'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';

export default function MyPageSidebar() {
  const { data: session } = useSession();
  const mentorItem = [
    {
      title: '내 정보',
      items: [
        { name: '프로필 설정', href: '/my/profile' },
        { name: '커리어 설정', href: '/my/career' },
      ],
    },
    {
      title: '멘토링 관리',
      items: [
        { name: '세션 관리', href: '/my/sessions' },
        { name: '스케줄 관리', href: '/my/schedule' },
        { name: '후기 관리', href: '/my/reviews' },
        { name: '수입 내역', href: '/my/earnings' },
      ],
    },
  ];

  const menteeItem = [
    {
      title: '내 정보',
      items: [{ name: '프로필 설정', href: '/my/profile' }],
    },
    {
      title: '이용 내역',
      items: [
        { name: '멘토링 일정', href: '/my/schedule' },
        { name: '내가 쓴 후기', href: '/my/reviews' },
        { name: '결제 내역', href: '/my/payments' },
        { name: '환불 내역', href: '/my/refunds' },
      ],
    },
  ];
  const pathname = usePathname();
  const tabs = session?.user?.role === 'mentor' ? mentorItem : menteeItem;
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
    </aside>
  );
}
