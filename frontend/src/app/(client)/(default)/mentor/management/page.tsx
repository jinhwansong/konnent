import React from 'react'
import Nav from '@/app/(client)/_component/Nav';
import Management from '../_component/Management';
import style from '@/styles/_common.module.scss';

export default function page() {
  return (
    <div className={style.mypage}>
      <Nav />
      <Management />
    </div>
  );
}
