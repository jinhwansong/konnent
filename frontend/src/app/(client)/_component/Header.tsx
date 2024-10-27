'use client';
import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLogout } from '@/app/_lib/check';
import { FcManager, FcHome, FcQuestions } from 'react-icons/fc';
import { BiSearch } from 'react-icons/bi';
import Input from '@/app/_component/Input';
import { useInput, usePopup } from '@/hooks';
import { usePopupStore } from '@/store/usePopupStore';
import { IcLogo, IcProfile } from '@/asset';
import styles from './header.module.scss';

export default function Header() {
  const queryClient = useQueryClient();
  const [search, changeSearch] = useInput('');
  const router = useRouter();
  const { onPopup, popup } = usePopupStore();
  const { popupRef } = usePopup();
  // 내정보
  const { data } = useQuery({
    queryKey: ['mydata'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = await response.json();
      return res;
    },
  });
  // 로그아웃
  const logoutMutation = useLogout();
  const onLogout = useCallback(() => {
    logoutMutation.mutate();
    queryClient.setQueryData(['mydata'], null);
    router.replace('/');
    onPopup();
   
  }, [router, onPopup, logoutMutation, queryClient]);

  console.log(data);
  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <div className={styles.header_top}>
          <Link href="/">
            <IcLogo />
          </Link>
          <div className={styles.header_link}>
            <Link href="/mentor">멘토지원</Link>
            {data ? (
              <div className={styles.profile}>
                <button
                  className={styles.profileImg}
                  onClick={onPopup}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Image
                    src={data.image || IcProfile}
                    alt={data.name as string}
                    height={35}
                    width={35}
                  />
                </button>
                {popup && (
                  <div className={styles.profile_tap} ref={popupRef}>
                    <div>
                      <em>{data.nickname}</em>
                      <p>{data.email || data.snsId}</p>
                    </div>
                    <div>
                      <Link href="/mypage">내 정보</Link>
                      <Link href="/mentorings">멘토링 신청 내역</Link>
                      <Link href="/bookmarks">북마크</Link>
                      <Link href="/follows">팔로우</Link>
                    </div>
                    <div>
                      <button onClick={onLogout}>로그아웃</button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">로그인</Link>
            )}
          </div>
        </div>
        <div className={styles.header_Btm}>
          <nav className={styles.header_nav}>
            <Link href="/">
              <FcHome />홈
            </Link>
            <Link href="/mentors">
              <FcManager />
              분야별 멘토 찾기
            </Link>
            <Link href="/article">
              <FcQuestions />
              분야별 아티클
            </Link>
          </nav>
          <form className={styles.header_search}>
            <Input
              type="text"
              value={search}
              onChange={changeSearch}
              placeholder="관심있는 직무, 회사, 멘토를 검색해보세요"
              name="search"
              bg="search"
            />
            <label htmlFor="search">
              <BiSearch />
            </label>
          </form>
        </div>
      </div>
    </header>
  );
}
