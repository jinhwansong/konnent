import { PaginatedResponse, PageParams, simulateLatency } from './types';

export interface AdminNoticeRow {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

let noticesStore: AdminNoticeRow[] = Array.from({ length: 12 }).map(
  (_, index) => ({
    id: `NTC-${(index + 1).toString().padStart(3, '0')}`,
    title: `공지사항 ${index + 1}`,
    content: `공지사항 본문 내용 ${index + 1}`,
    published: index % 2 === 0,
    createdAt: `2025-10-${(index % 28) + 1}`,
    updatedAt: `2025-11-${(index % 28) + 1}`,
  })
);

export async function fetchAdminNotices(
  params: PageParams & { published?: string }
): Promise<PaginatedResponse<AdminNoticeRow>> {
  const {
    page = 1,
    limit = 10,
    q = '',
    published = 'all',
    sort = 'createdAt:desc',
  } = params;

  let filtered = noticesStore.filter(notice => {
    const matchPublished =
      published === 'all'
        ? true
        : published === 'true'
          ? notice.published
          : !notice.published;
    const matchQuery = q
      ? notice.title.includes(q) ||
        notice.content.includes(q) ||
        notice.id.toLowerCase().includes(q.toLowerCase())
      : true;
    return matchPublished && matchQuery;
  });

  if (sort) {
    const [field, direction] = sort.split(':');
    filtered = filtered.sort((a, b) => {
      const aValue = String(a[field as keyof AdminNoticeRow] ?? '');
      const bValue = String(b[field as keyof AdminNoticeRow] ?? '');
      if (direction === 'asc') return aValue.localeCompare(bValue);
      return bValue.localeCompare(aValue);
    });
  }

  const start = (Number(page) - 1) * Number(limit);
  const paged = filtered.slice(start, start + Number(limit));

  return simulateLatency(
    {
      data: paged,
      meta: {
        page: Number(page),
        limit: Number(limit),
        totalCount: filtered.length,
        totalPages: Math.max(1, Math.ceil(filtered.length / Number(limit))),
        sort,
      },
    },
    450
  );
}

export async function createNotice(payload: {
  title: string;
  content: string;
  published: boolean;
}): Promise<AdminNoticeRow> {
  const newNotice: AdminNoticeRow = {
    id: `NTC-${(noticesStore.length + 1).toString().padStart(3, '0')}`,
    title: payload.title,
    content: payload.content,
    published: payload.published,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  noticesStore = [newNotice, ...noticesStore];
  return simulateLatency(newNotice, 400);
}

export async function updateNotice(
  id: string,
  payload: Partial<Omit<AdminNoticeRow, 'id' | 'createdAt'>>
): Promise<AdminNoticeRow> {
  let updated: AdminNoticeRow | undefined;
  noticesStore = noticesStore.map(notice => {
    if (notice.id === id) {
      updated = {
        ...notice,
        ...payload,
        updatedAt: new Date().toISOString(),
      };
      return updated;
    }
    return notice;
  });

  if (!updated) {
    throw new Error('Notice not found');
  }

  return simulateLatency(updated, 400);
}

export async function deleteNotice(id: string): Promise<void> {
  noticesStore = noticesStore.filter(notice => notice.id !== id);
  await simulateLatency(undefined, 350);
}

