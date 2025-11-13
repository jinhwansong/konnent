import { PaginatedResponse, PageParams, simulateLatency } from './types';

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface AdminArticleRow {
  id: string;
  title: string;
  author: string;
  views: number;
  likes: number;
  createdAt: string;
  status: ArticleStatus;
}

export interface AdminReviewRow {
  id: string;
  targetSession: string;
  author: string;
  rating: number;
  createdAt: string;
  reported: boolean;
}

const SAMPLE_ARTICLES: AdminArticleRow[] = Array.from({ length: 40 }).map(
  (_, index) => ({
    id: `ART-${(index + 1).toString().padStart(4, '0')}`,
    title: `플랫폼 아티클 ${index + 1}`,
    author: `작성자 ${index + 1}`,
    views: 1200 + index * 13,
    likes: 90 + (index % 40),
    createdAt: `2025-10-${(index % 28) + 1}`,
    status: (['published', 'draft', 'published', 'archived'][index % 4] ??
      'published') as ArticleStatus,
  })
);

const SAMPLE_REVIEWS: AdminReviewRow[] = Array.from({ length: 60 }).map(
  (_, index) => ({
    id: `REV-${(index + 1).toString().padStart(4, '0')}`,
    targetSession: `멘토링 세션 ${((index + 3) % 30) + 1}`,
    author: `리뷰어 ${index + 1}`,
    rating: (index % 5) + 1,
    createdAt: `2025-11-${(index % 28) + 1}`,
    reported: index % 7 === 0,
  })
);

export async function fetchAdminArticles(
  params: PageParams & { status?: string }
): Promise<PaginatedResponse<AdminArticleRow>> {
  const {
    page = 1,
    limit = 10,
    q = '',
    status = 'all',
    sort = 'createdAt:desc',
  } = params;

  let filtered = SAMPLE_ARTICLES.filter(article => {
    const matchStatus = status === 'all' ? true : article.status === status;
    const matchQuery = q
      ? article.title.includes(q) ||
        article.author.includes(q) ||
        article.id.toLowerCase().includes(q.toLowerCase())
      : true;
    return matchStatus && matchQuery;
  });

  if (sort) {
    const [field, direction] = sort.split(':');
    filtered = filtered.sort((a, b) => {
      const aValue = String(a[field as keyof AdminArticleRow] ?? '');
      const bValue = String(b[field as keyof AdminArticleRow] ?? '');
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
    520
  );
}

export async function fetchAdminReviews(
  params: PageParams & { reported?: string }
): Promise<PaginatedResponse<AdminReviewRow>> {
  const {
    page = 1,
    limit = 10,
    q = '',
    reported = 'all',
    sort = 'createdAt:desc',
  } = params;

  let filtered = SAMPLE_REVIEWS.filter(review => {
    const matchReported =
      reported === 'all'
        ? true
        : reported === 'reported'
          ? review.reported
          : !review.reported;
    const matchQuery = q
      ? review.author.includes(q) ||
        review.targetSession.includes(q) ||
        review.id.toLowerCase().includes(q.toLowerCase())
      : true;
    return matchReported && matchQuery;
  });

  if (sort) {
    const [field, direction] = sort.split(':');
    filtered = filtered.sort((a, b) => {
      const aValue = String(a[field as keyof AdminReviewRow] ?? '');
      const bValue = String(b[field as keyof AdminReviewRow] ?? '');
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
    520
  );
}

