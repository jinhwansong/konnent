import React from 'react'
import Mentor from '../_component/Mentor';
import style from '@/styles/_common.module.scss';

export default function page() {
  return (
    <article className={style.inner}>
      <Mentor />
    </article>
  );
}
