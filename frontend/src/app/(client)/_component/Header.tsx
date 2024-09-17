'use client';
import React, { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { FcManager, FcHome, FcQuestions } from 'react-icons/fc';
import { BiSearch } from 'react-icons/bi';
import Input from '@/app/_component/Input';
import { useInput, usePopup } from '@/hooks';
import { usePopupStore } from '@/store/usePopupStore';
import { IcLogo } from '@/asset';
import styles from './header.module.scss';



export default function Header() {
  const [search, changeSearch] = useInput('');
  const router = useRouter();
  const { data: me } = useSession();
   const { onPopup, popup } = usePopupStore();
   const { popupRef } = usePopup();
  const onLogout = useCallback(() => {
    signOut({ redirect: false }).then(() => {
      router.replace('/');
    });
    onPopup();
  }, [router, onPopup]);
 
  return (
    <header className={styles.header}>
      <div className={styles.header_inner}>
        <div className={styles.header_top}>
          <Link href="/">
            <IcLogo />
          </Link>
          <div className={styles.header_link}>
            <Link href="/mentor">멘토지원</Link>
            {me?.user ? (
              <div className={styles.profile}>
                <button
                  className={styles.profileImg}
                  onClick={onPopup}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <Image
                    src={me.user.image as string}
                    alt={me.user.name as string}
                    height={35}
                    width={35}
                  />
                </button>
                {popup && (
                  <div className={styles.profile_tap} ref={popupRef}>
                    <div>
                      <em>{me.user.name}</em>
                      <p>{me.user.email}</p>
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
