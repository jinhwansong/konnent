import { PaginatedResponse, PageParams, simulateLatency } from './types';

export type PaymentStatus = '성공' | '실패' | '환불';

export interface AdminPaymentRow {
  id: string;
  orderId: string;
  userName: string;
  amount: number;
  status: PaymentStatus;
  paidAt: string;
}

const SAMPLE_PAYMENTS: AdminPaymentRow[] = Array.from({ length: 80 }).map(
  (_, index) => ({
    id: `PAY-${(index + 1).toString().padStart(5, '0')}`,
    orderId: `ORD-${(index + 1000).toString().padStart(5, '0')}`,
    userName: `유저 ${index + 1}`,
    amount: 35000 + (index % 6) * 5000,
    status: (['성공', '환불', '성공', '성공', '실패'][index % 5] ??
      '성공') as PaymentStatus,
    paidAt: `2025-11-${(index % 28) + 1} ${(10 + (index % 10))
      .toString()
      .padStart(2, '0')}:15`,
  })
);

export async function fetchAdminPayments(
  params: PageParams & { status?: string }
): Promise<PaginatedResponse<AdminPaymentRow>> {
  const {
    page = 1,
    limit = 10,
    q = '',
    status = 'all',
    sort = 'paidAt:desc',
  } = params;

  let filtered = SAMPLE_PAYMENTS.filter(payment => {
    const matchStatus = status === 'all' ? true : payment.status === status;
    const matchQuery = q
      ? payment.userName.includes(q) ||
        payment.orderId.includes(q) ||
        payment.id.includes(q)
      : true;
    return matchStatus && matchQuery;
  });

  if (sort) {
    const [field, direction] = sort.split(':');
    filtered = filtered.sort((a, b) => {
      const aValue = String(a[field as keyof AdminPaymentRow] ?? '');
      const bValue = String(b[field as keyof AdminPaymentRow] ?? '');
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

