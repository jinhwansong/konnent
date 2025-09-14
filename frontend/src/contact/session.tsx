import { SessionItem } from '@/types/session';
import { formatDate } from '@/utils/formatDate';
import { formatDuration } from '@/utils/formatDuration';
import { formatPrice } from '@/utils/formatPrice';

export const sessionsColumns = [
  {
    header: '제목',
    accessor: (row: SessionItem) => (
      <span className="line-clamp-1 text-[var(--text-bold)]">{row.title}</span>
    ),
    className: 'w-[470px]',
  },
  {
    header: '시간',
    accessor: (row: SessionItem) => `${formatDuration(row.duration)}`,
    className: 'w-[80px]',
  },
  {
    header: '가격',
    accessor: (row: SessionItem) => `${formatPrice(row.price)}`,
    className: 'w-[100px]',
  },
  {
    header: '공개',
    accessor: (row: SessionItem) => (
      <span
        className={`inline-block rounded-full px-2 py-0.5 text-xs ${
          row.public
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {row.public ? '공개' : '비공개'}
      </span>
    ),
    className: 'w-[80px]',
  },
  {
    header: '등록일',
    accessor: (row: SessionItem) => formatDate(row.createdAt),
    className: 'w-[100px]',
  },
];
