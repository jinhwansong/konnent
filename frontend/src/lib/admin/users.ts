import { PaginatedResponse, PageParams, simulateLatency } from './types';

export type UserRole = 'mentee' | 'mentor' | 'admin';
export type UserStatus = 'active' | 'suspended';

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  status: UserStatus;
}

const SAMPLE_USERS: AdminUserRow[] = Array.from({ length: 60 }).map(
  (_, index) => {
    const roleIndex = index % 3;
    const role: UserRole = roleIndex === 0 ? 'mentee' : roleIndex === 1 ? 'mentor' : 'admin';
    const status: UserStatus = index % 7 === 0 ? 'suspended' : 'active';

    return {
      id: `USER-${(index + 1).toString().padStart(4, '0')}`,
      name: `사용자 ${index + 1}`,
      email: `user${index + 1}@konnect.dev`,
      role,
      createdAt: `2025-10-${(index % 28) + 1} 12:00`,
      status,
    };
  }
);

export async function fetchAdminUsers(
  params: PageParams & { role?: string; status?: string }
): Promise<PaginatedResponse<AdminUserRow>> {
  const {
    page = 1,
    limit = 10,
    q = '',
    role = 'all',
    status = 'all',
    sort = 'createdAt:desc',
  } = params;

  let filtered = SAMPLE_USERS.filter(user => {
    const matchRole = role === 'all' ? true : user.role === role;
    const matchStatus = status === 'all' ? true : user.status === status;
    const matchQuery = q
      ? user.name.includes(q) ||
        user.email.includes(q) ||
        user.id.toLowerCase().includes(q.toLowerCase())
      : true;
    return matchRole && matchStatus && matchQuery;
  });

  if (sort) {
    const [field, direction] = sort.split(':');
    filtered = filtered.sort((a, b) => {
      const aValue = String(a[field as keyof AdminUserRow] ?? '');
      const bValue = String(b[field as keyof AdminUserRow] ?? '');
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

