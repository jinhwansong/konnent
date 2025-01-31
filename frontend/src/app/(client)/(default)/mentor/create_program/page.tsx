
import React from 'react';
import Nav from '@/app/(client)/_component/Nav';
import styles from '@/styles/_common.module.scss';
import ProgramForm from '../_component/ProgramForm';

export default function page() {
  return (
    <div className={styles.mypage}>
      <Nav />
      <ProgramForm mode='edit'/>
    </div>
  );
}
