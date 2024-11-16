import React from 'react'
import style from './login.module.scss';
import Login from './_component/Login';

export default function Page() {
  return (
    <article className={style.article}>
      <Login />
    </article>
  );
}
