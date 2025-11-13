import { simulateLatency } from './types';

export interface DashboardMetric {
  id: string;
  label: string;
  value: number;
  delta?: number;
  trend?: 'up' | 'down' | 'neutral';
  subText?: string;
}

export interface MiniTrendPoint {
  date: string;
  signup: number;
  payment: number;
}

export interface DashboardRecentPayment extends Record<string, unknown> {
  id: string;
  userName: string;
  amount: number;
  status: '성공' | '환불';
  paidAt: string;
}

export interface DashboardRecentApplication extends Record<string, unknown> {
  id: string;
  applicantName: string;
  careerYears: number;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface DashboardData {
  metrics: DashboardMetric[];
  recentPayments: DashboardRecentPayment[];
  recentApplications: DashboardRecentApplication[];
  trends: MiniTrendPoint[];
}

export async function fetchAdminDashboard(): Promise<DashboardData> {
  const today = new Date();
  const format = (date: Date) =>
    `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;

  const trends: MiniTrendPoint[] = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return {
      date: format(date),
      signup: Math.floor(Math.random() * 40) + 10,
      payment: Math.floor(Math.random() * 30) + 8,
    };
  });

  return simulateLatency(
    {
      metrics: [
        {
          id: 'new-users',
          label: '오늘 가입자',
          value: 42,
          delta: 8,
          trend: 'up',
          subText: '어제 대비',
        },
        {
          id: 'payments',
          label: '오늘 결제액',
          value: 1280000,
          delta: -3,
          trend: 'down',
          subText: '오늘 결제 건수 34건',
        },
        {
          id: 'reservations',
          label: '오늘 예약',
          value: 58,
          delta: 4,
          trend: 'up',
        },
        {
          id: 'mentor-applications',
          label: '신규 멘토 신청',
          value: 7,
          delta: 2,
          trend: 'up',
        },
      ],
      recentPayments: Array.from({ length: 5 }).map((_, index) => ({
        id: `pay-${index + 1}`,
        userName: `홍길동 ${index + 1}`,
        amount: Math.floor(Math.random() * 100000) + 20000,
        status: index === 3 ? '환불' : '성공',
        paidAt: `2025-11-12 0${index}:30`,
      })),
      recentApplications: Array.from({ length: 5 }).map((_, index) => ({
        id: `app-${index + 1}`,
        applicantName: `지원자 ${index + 1}`,
        careerYears: Math.floor(Math.random() * 8) + 2,
        submittedAt: `2025-11-12 0${index}:15`,
        status: index % 3 === 0 ? 'pending' : index % 3 === 1 ? 'approved' : 'rejected',
      })),
      trends,
    },
    500
  );
}

