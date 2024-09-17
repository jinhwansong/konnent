'use client';
import React from 'react';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import { usePopup } from '@/hooks';
import styles from './selet.module.scss';

interface ISelet {
  list: string[];
  seletText: string;
  open: boolean;
  onPopup: () => void;
  text: string;
  onSelet: (selet: string) => void;
  width?:string
}
export default function Selet({
  onPopup,
  seletText,
  open,
  list,
  text,
  onSelet,
  width,
}: ISelet) {
  const { popupRef } = usePopup();
  const seletbox = [styles.seletbox, width && styles[`width${width as string}`]]
    .filter(Boolean)
    .join(' ');;
  return (
    <div className={styles.selet}>
      <button
        onClick={onPopup}
        onMouseDown={(e) => e.stopPropagation()}
        type="button"
      >
        {seletText ? seletText : <p>{text}</p>}
        {open ? <BiCaretUp /> : <BiCaretDown />}
      </button>
      {open && (
        <div ref={popupRef} className={seletbox}>
          {list.map((jobs) => (
            <button type="button" key={jobs} onClick={() => onSelet(jobs)}>
              {jobs}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
