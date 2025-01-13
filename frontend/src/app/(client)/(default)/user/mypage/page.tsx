import React from 'react'
import Nav from '@/app/(client)/_component/Nav';
import Mypage from '../_component/Mypage';
import style from '@/styles/_common.module.scss';

export default function page() {
  return (
    <div className={style.mypage}>
      <Nav />
      <Mypage />
    </div>
  );
}
