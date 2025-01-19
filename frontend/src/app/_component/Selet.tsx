'use client';
import React from 'react';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import usePopup from '@/hooks/usePopup';
import style from './selet.module.scss';

interface ISelet {
  list: string[];
  seletText: string;
  open: boolean;
  onPopup: () => void;
  text: string;
  onSelet: (selet: string) => void;
  width?: string;
  name: string;
}
export default function Selet({
  onPopup,
  seletText,
  open,
  list,
  text,
  onSelet,
  width,
  name,
}: ISelet) {
  const { popupRef } = usePopup();
  const seletbox = [style.seletbox, width && style[`width${width as string}`]]
    .filter(Boolean)
    .join(' ');
  return (
    <div className={style.selet}>
      <input type="hidden" name={name} value={seletText} />
      <button
        onClick={onPopup}
        onMouseDown={(e) => e.stopPropagation()}
        type="button"
      >
        {seletText ? seletText : text}
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
