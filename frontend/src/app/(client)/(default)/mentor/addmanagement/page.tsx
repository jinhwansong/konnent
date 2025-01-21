import React from 'react'
import Nav from '@/app/(client)/_component/Nav';
import Addmanage from '../_component/Addmanage';
import style from '@/styles/_common.module.scss';

export default function page() {
  return (
    <div className={style.mypage}>
      <Nav />
      <Addmanage />
    </div>
  );
}
