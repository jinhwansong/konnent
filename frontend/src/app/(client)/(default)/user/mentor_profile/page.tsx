import React from 'react';
import Nav from '@/app/(client)/_component/Nav';
import MentoProfile from '../_component/MentoProfile';
import style from '@/styles/_common.module.scss';


export default function Page() {
  return (
    <div className={style.mypage}>
      <Nav />
      <MentoProfile />
    </div>
  );
}
