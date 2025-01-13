'use client';
import React, { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { BiSearch, BiLogOut, BiSun, BiMoon, BiBell } from 'react-icons/bi';
import Input from '@/app/_component/Input';
import { useUserData } from '@/app/_lib/useUser';
import { useLogout } from '@/app/_lib/useLogout';
import { useInput } from '@/hooks';
import style from './header.module.scss';
import Image from 'next/image';
import { IcProfile } from '@/asset';

export default function Header() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [search, changeSearch] = useInput('');
  // 내정보
  const { data } = useUserData();
  // 로그아웃
  const logoutMutation = useLogout();
  const onLogout = useCallback(() => {
    logoutMutation.mutate();
    queryClient.setQueryData(['mydata'], null);
    router.replace('/');
  }, [router, logoutMutation, queryClient]);
  return (
    <header className={style.header}>
      <form className={style.header_search}>
        <Input
          type="text"
          value={search}
          onChange={changeSearch}
          placeholder="검색해보세요"
          name="search"
          bg="search"
        />
        <label htmlFor="search">
          <BiSearch />
        </label>
      </form>
      <div className={style.header_right}>
        <div className={style.header_right_profile}>
          <Image
            src={IcProfile}
            alt={data?.name as string}
            height={30}
            width={30}
          />
          <span>{data?.nickname}</span>
        </div>
        <div className={style.header_right_icons}>
          <button>
            <BiSun />
          </button>
          <button>
            <BiBell />
          </button>
          <button onClick={() => onLogout()}>
            <BiLogOut />
          </button>
        </div>
      </div>
    </header>
  );
}
