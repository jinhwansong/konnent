'use client';
import React from 'react';
import Link from 'next/link';
import { useUserData } from '@/app/_lib/useUser';
import style from './nav.module.scss';
import { usePathname } from 'next/navigation';

interface INavItem {
  title: string;
  href: string;
}

interface INavSection {
  title: string;
  items: INavItem[];
}

export default function Nav() {
  const pathname = usePathname();
  // 내정보
  const { data } = useUserData();
  // 공통 프로필 관리 항목
  const profileSection: INavSection = {
    title: '프로필 관리',
    items: [
      { title: '내 정보', href: '/user/mypage' },
      { title: '알림', href: '/user/messages' },
      { title: '북마크', href: '/user/bookmarks' },
      { title: '팔로우', href: '/user/relationships' },
    ],
  };

  // 멘토 전용 섹션
  const mentorSection: INavSection = {
    title: '멘토 관리',
    items: [
      { title: '멘토 정보', href: '/user/mentor_profile',},
      { title: '멘토링 일정 관리', href: '/mentor/schedule' },
      { title: '멘토링 생성/관리', href: '/mentor/management' },
      { title: '받은 리뷰 관리', href: '/mentor/reviews' },
      { title: '작성한 게시글', href: '/mentor/posts' },
    ],
  };

  // 일반 사용자 전용 섹션
  const userSection: INavSection = {
    title: '멘토링 신청관리',
    items: [
      { title: '멘토링 신청 내역', href: '/mentoring/applications' },
      { title: '결제/환불 내역', href: '/mentoring/payments' },
    ],
  };
  // 현재 댑스
  const renderSection = (section: INavSection) => (
    <div className={style.navItem}>
      <h4>{section.title}</h4>
      <ul>
        {section?.items.map((item) => (
          <li key={item.href} className={item.href === pathname ? style.active : ''}>
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <nav className={style.nav}>
      {renderSection(profileSection)}
      {data?.role === 'mentor'
        ? renderSection(mentorSection)
        : renderSection(userSection)}
    </nav>
  );
}
