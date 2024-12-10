import React from 'react'
import style from './Mentor.module.scss';
import Mentor from '../_component/Mentor';

export default function page() {
  return (
    <article className={style.inner}>
      <Mentor />
    </article>
  );
}
