import React from 'react'
import styles from './login.module.scss';
import Login from './_component/Login';

export default function Page() {
  return (
    <article className={styles.article}>
      <Login />
    </article>
  );
}
