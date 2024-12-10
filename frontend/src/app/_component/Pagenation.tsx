import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IPages } from '@/type';
import style from './pagenaion.module.scss';

export default function Pagenation({
  totalPage,
  currentPage,
  onPrevPage,
  onNextPage,
  onPage,
}: IPages) {
  return (
    <div className={style.pagenation}>
      <button onClick={() => onPrevPage()} disabled={currentPage === 1}>
        <FiChevronLeft />
      </button>

      {Array.from({ length: totalPage }, (_, index) => (
        <button
          key={index}
          onClick={() => onPage(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}

      <button onClick={() => onNextPage()} disabled={currentPage === totalPage}>
        <FiChevronRight />
      </button>
    </div>
  );
}
