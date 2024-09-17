import React from 'react'
import Mento from './_component/Mento';
import styles from './mento.module.scss';

export default function page() {
  return (
    <article className={styles.article}>
      <h4>멘토 지원하기</h4>
      <p>
        나누고 싶은 지식이 있는 누구나 멘토가 될 수 있어요!
        <br />
        <span>업계 후배들 혹은 동료들</span>이 더 빨리, 더 멀리 갈 수 있도록
        도와주세요!
      </p>
      <Mento/>
    </article>
  );
}
