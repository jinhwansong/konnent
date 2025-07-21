import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { FiSearch } from 'react-icons/fi';
import Logo from '@/assets/logo.svg';

export default function Header() {
  const mainNav = [
    { href: '/mentors', name: '멘토 찾기' },
    { href: '/schedule', name: '멘토링 일정' },
    { href: '/articles', name: '아티클' },
  ];

  const menuItems = [
    { type: 'button', icon: <FiSearch /> },
    { type: 'link', href: '/mentor', label: '멘토 모집' },
    { type: 'link', href: '/login', label: '로그인' },
    {
      type: 'link',
      href: '/signup',
      label: '회원가입',
      className:
        'bg-[var(--primary-sub01)] hover:bg-[var(--primary)] text-white',
    },
  ];
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
          {menuItems.map((item, index) => (
            <li key={index} className="mr-1 flex items-center">
              {item.type === 'link' ? (
                <Link
                  href={item.href!}
                  className={clsx(
                    'h-9 w-20 rounded text-center text-sm leading-9',
                    item.className || 'hover:bg-[var(--primary-sub02)]',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <button className="mr-2">{item.icon}</button>
              )}
              {index < menuItems.length - 2 && (
                <div className="ml-1 flex h-3.5 w-px flex-shrink-0 bg-[var(--border-color)]" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
