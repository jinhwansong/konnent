import React from 'react'
import Nav from '@/app/(client)/_component/Nav';
import UserProfile from '../_component/UserProfile';
import style from '@/styles/_common.module.scss';

export default function page() {
  return (
    <div className={style.mypage}>
      <Nav />
      <UserProfile />
    </div>
  );
}
