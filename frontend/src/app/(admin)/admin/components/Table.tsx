'use client';
import React from 'react';
import { IColumn, IPage, ITables } from '@/type';
import Pagenation from '@/app/_component/Pagenation';
import style from './table.module.scss';
import { useRouter } from 'next/navigation';

interface ITable extends IPage {
  title: string;
  columns: IColumn[];
  data?: ITables;
}

export default function Table({
  title,
  columns,
  currentPage,
  onPrevPage,
  onNextPage,
  onPage,
  data,
}: ITable) {
    const router = useRouter();
  return (
    <div className={style.tablebg}>
      {title && (
        <div>
          <h4 className={style.title}>{title}</h4>
        </div>
      )}

      <div>
        <table className={style.table}>
          <thead>
            <tr>
              {columns?.map((column) => (
                <th key={column.id}>{column.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.page.map((item) => (
              <tr
                key={(item as any).id}
                onClick={() =>
                  title === '멘토 신청 관리' &&
                  router.push(`/admin/mentors/${item.id}`)
                }
                className={title === '멘토 신청 관리' ? style.click : ''}
              >
                {columns?.map((column) => (
                  <td key={column.id}>
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagenation
        totalPage={data?.totalPage as number}
        currentPage={currentPage}
        onPrevPage={onPrevPage}
        onNextPage={onNextPage}
        onPage={onPage}
      />
    </div>
  );
}
