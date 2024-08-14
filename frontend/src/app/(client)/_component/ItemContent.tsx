'use client'
import React from 'react'
import { useTap } from '@/hooks';
import styles from './itemContent.module.scss';


export default function ItemContent() {
  const [tapBtn, changeBtn] = useTap(1)
  const taps = [
    { id: 1, name: '자소서/면접준비' },
    { id: 2, name: '개발자 커리어' },
    { id: 3, name: '마케팅 필수전략' },
  ];
    
  return (
    <article>
      <h4 className={styles.title}>관심있는 멘토에게 질문하기</h4>
      <div className={styles.tap_warp}>
        {taps.map((tap) => (
          <button
            key={tap.id}
            onClick={() => changeBtn(tap.id)}
            className={`${tap.id === tapBtn ? styles.tap_active : ''}`}
          >
            {tap.name}
          </button>
        ))}
      </div>
    </article>
  );
}
