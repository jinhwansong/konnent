// 중앙 집중식 쿼리 키 관리

import { QUERY_KEYS } from '@/utils/constants';

export const queryKeys = {
  // Articles
  articles: {
    all: [QUERY_KEYS.ARTICLES] as const,
    lists: () => [...queryKeys.articles.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.articles.lists(), params] as const,
    details: () => [...queryKeys.articles.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.articles.details(), id] as const,
    comments: (articleId: string) =>
      [...queryKeys.articles.detail(articleId), 'comments'] as const,
    liked: (ids: string[]) =>
      [...queryKeys.articles.all, 'liked', ids] as const,
  },

  // Sessions
  sessions: {
    all: [QUERY_KEYS.SESSIONS] as const,
    lists: () => [...queryKeys.sessions.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.sessions.lists(), params] as const,
    details: () => [...queryKeys.sessions.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.sessions.details(), id] as const,
  },

  // Mentors
  mentors: {
    all: [QUERY_KEYS.MENTORS] as const,
    lists: () => [...queryKeys.mentors.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.mentors.lists(), params] as const,
    details: () => [...queryKeys.mentors.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.mentors.details(), id] as const,
  },

  // Reservations
  reservations: {
    all: [QUERY_KEYS.RESERVATIONS] as const,
    lists: () => [...queryKeys.reservations.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.reservations.lists(), params] as const,
  },

  // Reviews
  reviews: {
    all: [QUERY_KEYS.REVIEWS] as const,
    lists: () => [...queryKeys.reviews.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.reviews.lists(), params] as const,
  },

  // Schedules
  schedules: {
    all: [QUERY_KEYS.SCHEDULES] as const,
    lists: () => [...queryKeys.schedules.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.schedules.lists(), params] as const,
  },

  // User
  user: {
    all: [QUERY_KEYS.USER_PROFILE] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },

  // Payments
  payments: {
    all: [QUERY_KEYS.PAYMENTS] as const,
    lists: () => [...queryKeys.payments.all, 'list'] as const,
    list: (params: Record<string, unknown>) =>
      [...queryKeys.payments.lists(), params] as const,
  },
} as const;
