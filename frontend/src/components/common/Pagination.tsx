import clsx from 'clsx';
import React from 'react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi';

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (newPage: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onChange,
}: PaginationProps) {
  const group = Math.ceil(page / 10);
  const start = (group - 1) * 10 + 1;
  const end = Math.min(group * 10, totalPages);
  const handlePage = (p: number) => {
    if (p >= 1 && p <= totalPages) onChange(p);
  };
  return (
    <div className="mt-5 flex w-full items-center justify-center gap-1.5">
      <button
        onClick={() => handlePage(1)}
        // disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        <FiChevronsLeft />
      </button>
      <button
        onClick={() => handlePage(page - 1)}
        // disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        <FiChevronLeft />
      </button>

      {Array.from({ length: end - start + 1 }, (_, index) => {
        const pageNum = start + index;
        return (
          <button
            key={pageNum}
            onClick={() => handlePage(pageNum)}
            // disabled={page === pageNum}
            className={clsx(
              'flex h-9 w-9 items-center justify-center rounded-full border',
              page === pageNum
                ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
                : 'border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)]',
            )}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        onClick={() => handlePage(page + 1)}
        disabled={page === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        <FiChevronRight />
      </button>
      <button
        onClick={() => handlePage(totalPages)}
        disabled={page === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
      >
        <FiChevronsRight />
      </button>
    </div>
  );
}
