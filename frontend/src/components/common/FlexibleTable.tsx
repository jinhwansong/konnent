// components/common/FlexibleTable.tsx
'use client';
import clsx from 'clsx';
import React from 'react';

type Column<T> = {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
};

interface FlexibleTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
}

export default function FlexibleTable<T>({
  data,
  columns,
  onRowClick,
}: FlexibleTableProps<T>) {
  return (
    <div className="min-h-[550px] w-full table-fixed overflow-x-auto">
      <table className="min-w-full rounded-xl bg-[var(--background)] text-sm text-[var(--text)]">
        <thead className="border-y border-[var(--border-color)] bg-[var(--primary-sub02)]">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-sm font-medium text-[var(--text-bold)]"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={columns?.length} className="py-10 text-center">
                데이터가 없습니다.
              </td>
            </tr>
          ) : (
            data?.map((row, i) => (
              <tr
                key={i}
                className={clsx(
                  'border-t border-[var(--border-color)] transition-colors duration-150 hover:bg-[var(--primary-sub02)]',
                  onRowClick ? 'cursor-pointer' : '',
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns?.map((col, j) => {
                  const content =
                    typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode);
                  return (
                    <td
                      key={j}
                      className={`px-4 py-3 text-sm ${col.className ?? ''}`}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
