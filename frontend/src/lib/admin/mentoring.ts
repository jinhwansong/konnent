import { PaginatedResponse, PageParams, simulateLatency } from './types';

export type MentoringSessionStatus = 'draft' | 'published';
export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface MentoringSessionRow {
  id: string;
  title: string;
  mentorName: string;
  category: string;
  isPublic: boolean;
  startAt: string;
  price: number;
}

export interface ReservationRow {
  id: string;
  sessionTitle: string;
  menteeName: string;
  time: string;
  status: ReservationStatus;
  paid: boolean;
}

const SAMPLE_SESSIONS: MentoringSessionRow[] = Array.from({ length: 30 }).map(
  (_, index) => ({
    id: `SES-${(index + 1).toString().padStart(4, '0')}`,
    title: `멘토링 세션 ${index + 1}`,
    mentorName: `멘토 ${index + 1}`,
    category: ['커리어', '개발', '디자인'][index % 3],
    isPublic: index % 2 === 0,
    startAt: `2025-11-${(index % 28) + 1} 19:${(index % 4) * 15}`,
    price: 50000 + (index % 5) * 10000,
  })
);

const SAMPLE_RESERVATIONS: ReservationRow[] = Array.from({ length: 50 }).map(
  (_, index) => ({
    id: `RSV-${(index + 1).toString().padStart(4, '0')}`,
    sessionTitle: `멘토링 세션 ${((index + 5) % 30) + 1}`,
    menteeName: `멘티 ${index + 1}`,
    time: `2025-11-${(index % 28) + 1} 20:${(index % 4) * 15}`,
    status: index % 3 === 0 ? 'pending' : index % 3 === 1 ? 'confirmed' : 'cancelled',
    paid: index % 4 !== 0,
  })
);

export async function fetchMentoringSessions(
  params: PageParams & { status?: string; category?: string }
): Promise<PaginatedResponse<MentoringSessionRow>> {
  const {
    page = 1,
    limit = 10,
    q = '',
    status = 'all',
    category = 'all',
    sort = 'startAt:desc',
  } = params;

  let filtered = SAMPLE_SESSIONS.filter(session => {
    const matchStatus =
      status === 'all'
        ? true
        : status === 'published'
          ? session.isPublic
          : !session.isPublic;
    const matchQuery = q
      ? session.title.includes(q) ||
        session.mentorName.includes(q) ||
        session.id.toLowerCase().includes(q.toLowerCase())
      : true;
    const matchCategory = category === 'all' ? true : session.category === category;
    return matchStatus && matchQuery && matchCategory;
  });

  if (sort) {
    const [field, direction] = sort.split(':');
    filtered = filtered.sort((a, b) => {
      const aValue = String(a[field as keyof MentoringSessionRow] ?? '');
      const bValue = String(b[field as keyof MentoringSessionRow] ?? '');
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
    500
  );
}

export async function fetchMentoringReservations(
  params: PageParams & { status?: string }
): Promise<PaginatedResponse<ReservationRow>> {
  const {
    page = 1,
    limit = 10,
    q = '',
    status = 'all',
    sort = 'time:desc',
  } = params;

  let filtered = SAMPLE_RESERVATIONS.filter(reservation => {
    const matchStatus = status === 'all' ? true : reservation.status === status;
    const matchQuery = q
      ? reservation.sessionTitle.includes(q) ||
        reservation.menteeName.includes(q) ||
        reservation.id.toLowerCase().includes(q.toLowerCase())
      : true;
    return matchStatus && matchQuery;
  });

  if (sort) {
    const [field, direction] = sort.split(':');
    filtered = filtered.sort((a, b) => {
      const aValue = String(a[field as keyof ReservationRow] ?? '');
      const bValue = String(b[field as keyof ReservationRow] ?? '');
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
    550
  );
}

