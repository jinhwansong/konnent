'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { IColumn, IPage, ITables } from '@/type';
import Pagenation from '@/app/_component/Pagenation';
import style from './table.module.scss';


interface ITable<T extends { id: number }> extends IPage {
  column: IColumn<T>[];
  data?: ITables<T>;
}

export default function Table<T extends { id: number }>({
  column,
  currentPage,
  onPrevPage,
  onNextPage,
  onPage,
  data,
}: ITable<T>) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <table className={style.table}>
        <thead>
          <tr>
            {column?.map((config) => (
              <th key={config.id}>{config.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((item) => (
            <tr
              key={item.id}
              onClick={() =>
                pathname.split('/')[2] === 'management' &&
                router.push(`/mentor/management/${item.id}`)
              }
              className={
                pathname.split('/')[2] === 'management' ? style.click : ''
              }
            >
              {column?.map((config) => (
                <td key={config.id}>{config.render?.(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagenation
        totalPage={data?.totalPage as number}
        currentPage={currentPage}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        onPage={onPage}
      />
    </>
  );
}
