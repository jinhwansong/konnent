import React from 'react'
import Mento from '../_component/Mento'
import style from './mento.module.scss';

export default function page() {
  return (
    <article className={style.inner}>
      <Mento />
    </article>
  );
}
