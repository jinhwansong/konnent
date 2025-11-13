import { PaginatedResponse, PageParams, simulateLatency } from './types';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface MentorApplicationRow {
  id: string;
  applicantName: string;
  careerYears: number;
  portfolioUrl: string;
  submittedAt: string;
  status: ApplicationStatus;
}

const SAMPLE_APPLICATIONS: MentorApplicationRow[] = Array.from({
  length: 45,
}).map((_, index) => {
  const statusIndex = index % 3;
  const status: ApplicationStatus =
    statusIndex === 0 ? 'pending' : statusIndex === 1 ? 'approved' : 'rejected';

  return {
    id: `APP-${(index + 1).toString().padStart(4, '0')}`,
    applicantName: `멘토 지원자 ${index + 1}`,
    careerYears: Math.floor(Math.random() * 10) + 1,
    portfolioUrl: `https://portfolio.example.com/mentor-${index + 1}`,
    submittedAt: `2025-11-${(index % 28) + 1} 09:30`,
    status,
  };
});

export async function fetchMentorApplications(
  params: PageParams & { status?: string }
): Promise<PaginatedResponse<MentorApplicationRow>> {
  const {
    page = 1,
    limit = 10,
    q = '',
    status = 'all',
    sort = 'submittedAt:desc',
  } = params;

  let filtered = SAMPLE_APPLICATIONS.filter(app => {
    const matchStatus = status === 'all' ? true : app.status === status;
    const matchQuery = q
      ? app.applicantName.includes(q) ||
        app.id.toLowerCase().includes(q.toLowerCase()) ||
        app.portfolioUrl.includes(q)
      : true;
    return matchStatus && matchQuery;
  });

  if (sort) {
    const [field, direction] = sort.split(':');
    filtered = filtered.sort((a, b) => {
      const aValue = String(a[field as keyof MentorApplicationRow] ?? '');
      const bValue = String(b[field as keyof MentorApplicationRow] ?? '');
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

