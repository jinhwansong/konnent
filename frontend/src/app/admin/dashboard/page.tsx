'use client';

import AdminShell from '@/components/common/AdminShell';
import DataTable from '@/components/common/DataTable';
import EmptyState from '@/components/common/EmptyState';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import { useAdminDashboard } from '@/hooks/query/useAdmin';
import type {
  DashboardMetric,
  DashboardRecentPayment,
  DashboardRecentApplication,
} from '@/types/admin';

export default function AdminDashboardPage() {
  const { data, isLoading, isError, error } = useAdminDashboard();

  const metrics = data?.metrics ?? [];
  const trends = data?.trends ?? [];
  const payments = data?.recentPayments ?? [];
  const applications = data?.recentApplications ?? [];

  const paymentColumns = [
    { key: 'userName', label: '사용자', sortable: false },
    { key: 'amount', label: '금액', sortable: false },
    { key: 'status', label: '상태', sortable: false },
    { key: 'paidAt', label: '결제일시', sortable: false },
  ];

  const applicationColumns = [
    { key: 'applicantName', label: '신청자', sortable: false },
    { key: 'careerYears', label: '경력', sortable: false },
    { key: 'submittedAt', label: '신청일시', sortable: false },
    { key: 'status', label: '상태', sortable: false },
  ];


  return (
    <AdminShell title="대시보드">
      <PageHeader
        title="운영 현황"
        description="하루 단위 주요 지표와 최근 활동을 확인하고 플랫폼 상태를 빠르게 파악하세요."
      />

      {isError && !data ? (
        <EmptyState
          title="대시보드 데이터를 불러오지 못했어요."
          description={error?.message ?? '잠시 후 다시 시도해주세요.'}
        />
      ) : (
        <>
          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric: DashboardMetric) => (
              <StatCard
                key={metric.id}
                title={metric.label}
                value={metric.value >= 1000 ? metric.value.toLocaleString() : metric.value}
                changeLabel={
                  typeof metric.delta === 'number'
                    ? `${metric.delta >= 0 ? '+' : ''}${metric.delta}%`
                    : undefined
                }
                trend={metric.trend}
                subText={metric.subText}
              />
            ))}
            {isLoading && metrics.length === 0 && (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`metric-skeleton-${index}`}
                    className="h-32 animate-pulse rounded-[var(--radius-lg,1rem)] border border-[var(--border-color)] bg-[var(--card-bg)]"
                  />
                ))}
              </>
            )}
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-[var(--radius-lg,1rem)] border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm">
              <header className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-bold)]">
                    7일 가입/결제 트렌드
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-sub)]">
                    가입자 및 결제 건수 추이를 간단하게 확인하세요.
                  </p>
                </div>
              </header>
              <MiniTrendChart points={trends} isLoading={isLoading} />
            </article>

            <article className="rounded-[var(--radius-lg,1rem)] border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm">
              <header className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-[var(--text-bold)]">
                    최근 멘토 신청
                  </h3>
                  <p className="mt-1 text-xs text-[var(--text-sub)]">
                    신규 멘토 풀을 빠르게 검토하세요.
                  </p>
                </div>
              </header>
              <DataTable<DashboardRecentApplication>
                columns={applicationColumns}
                data={applications}
                isLoading={isLoading}
                isError={isError}
                errorMessage={error?.message}
                emptyMessage="최근 멘토 신청이 없습니다."
                getRowKey={row => row.id}
                renderRow={row => (
                  <>
                    <td className="px-6 py-3 text-sm font-medium text-[var(--text-bold)]">
                      {row.applicantName}
                    </td>
                    <td className="px-6 py-3 text-sm text-[var(--text)]">
                      {row.careerYears}년
                    </td>
                    <td className="px-6 py-3 text-sm text-[var(--text-sub)]">
                      {row.submittedAt}
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <StatusPill status={row.status} />
                    </td>
                  </>
                )}
              />
            </article>
          </section>

          <section className="mt-8 rounded-[var(--radius-lg,1rem)] border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-sm">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-[var(--text-bold)]">
                  최근 결제 5건
                </h3>
                <p className="mt-1 text-xs text-[var(--text-sub)]">
                  최신 결제 건을 확인하고 이상 거래를 빠르게 대응하세요.
                </p>
              </div>
            </header>
            <DataTable<DashboardRecentPayment>
              columns={paymentColumns}
              data={payments}
              isLoading={isLoading}
              isError={isError}
              errorMessage={error?.message}
              emptyMessage="최근 결제 내역이 없습니다."
              getRowKey={row => row.id}
              renderRow={row => (
                <>
                  <td className="px-6 py-3 text-sm font-medium text-[var(--text-bold)]">
                    {row.userName}
                  </td>
                  <td className="px-6 py-3 text-right text-sm font-semibold text-[var(--text-bold)]">
                    ₩{row.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-sm">
                    <StatusPill status={row.status} />
                  </td>
                  <td className="px-6 py-3 text-sm text-[var(--text-sub)]">
                    {row.paidAt}
                  </td>
                </>
              )}
            />
          </section>
        </>
      )}
    </AdminShell>
  );
}

function StatusPill({ status }: { status: string }) {
  const normalized =
    status === 'pending'
      ? '검토중'
      : status === 'approved'
        ? '승인'
        : status === 'rejected'
          ? '거절'
          : status;
  const appearance =
    normalized === '성공' || normalized === '승인'
      ? 'bg-[var(--primary-sub02)] text-[var(--primary)]'
      : normalized === '환불' || normalized === '거절'
        ? 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'
        : 'bg-[var(--hover-bg)] text-[var(--text-sub)]';

  return (
    <span
      className={`inline-flex min-w-[72px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${appearance}`}
    >
      {normalized}
    </span>
  );
}

function MiniTrendChart({
  points,
  isLoading,
}: {
  points: { date: string; signup: number; payment: number }[];
  isLoading: boolean;
}) {
  if (isLoading && points.length === 0) {
    return (
      <div className="h-48 animate-pulse rounded-[var(--radius-lg,1rem)] bg-[var(--hover-bg)]" />
    );
  }

  if (!points.length) {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-[var(--radius-lg,1rem)] border border-dashed border-[var(--border-color)] text-sm text-[var(--text-sub)]">
        데이터가 충분하지 않습니다.
      </div>
    );
  }

  const width = 360;
  const height = 160;
  const padding = 20;

  const signupValues = points.map(point => point.signup);
  const paymentValues = points.map(point => point.payment);
  const maxValue = Math.max(...signupValues, ...paymentValues, 1);

  const toPolyline = (values: number[]) =>
    values
      .map((value, index) => {
        const x =
          padding + (index / Math.max(1, values.length - 1)) * (width - padding * 2);
        const y = height - padding - (value / maxValue) * (height - padding * 2);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

  return (
    <div className="flex flex-col gap-4">
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="7일 가입 및 결제 추이"
        className="rounded-[var(--radius-lg,1rem)] border border-[var(--border-color)] bg-[var(--background)]"
      >
        <polyline
          fill="none"
          stroke="var(--primary-sub04)"
          strokeWidth={2}
          strokeLinecap="round"
          points={toPolyline(signupValues)}
        />
        <polyline
          fill="none"
          stroke="var(--primary)"
          strokeWidth={2}
          strokeLinecap="round"
          points={toPolyline(paymentValues)}
        />
        {points.map((point, index) => {
          const x =
            padding + (index / Math.max(1, points.length - 1)) * (width - padding * 2);
          const ySignup =
            height - padding - (point.signup / maxValue) * (height - padding * 2);
          const yPayment =
            height - padding - (point.payment / maxValue) * (height - padding * 2);
          return (
            <g key={point.date}>
              <circle cx={x} cy={ySignup} r={3} fill="var(--primary-sub04)" />
              <circle cx={x} cy={yPayment} r={3} fill="var(--primary)" />
            </g>
          );
        })}
      </svg>
      <div className="flex items-center justify-between text-xs text-[var(--text-sub)]">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-[var(--primary-sub04)]" />
          가입자
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-[var(--primary)]" />
          결제
        </div>
      </div>
    </div>
  );
}

