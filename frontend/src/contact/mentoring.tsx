import { JSX } from 'react';
import {
  FiUsers,
  FiTrendingUp,
  FiMic,
  FiBriefcase,
  FiDollarSign,
  FiTarget,
  FiCpu,
  FiEdit3,
  FiFeather,
  FiBookOpen,
  FiTool,
  FiBox,
  FiLayers,
  FiHeadphones,
  FiMoreHorizontal,
  FiDatabase,
  FiMonitor,
  FiSmartphone,
  FiZap,
  FiBarChart2,
  FiAward,
  FiStar,
  FiServer,
  FiShield,
  FiHardDrive,
  FiClipboard,
  FiUserCheck,
  FiPenTool,
  FiFileText,
} from 'react-icons/fi';
import { CAREER_OPTIONS, POSITION_OPTIONS } from './apply';
import { Option } from '@/types/apply';

export enum MentoringCategory {
  HR = 'hr', // 인사/총무/노무
  MARKETING = 'marketing', // 마케팅/MD
  PR = 'pr', //홍보/CSR
  SALES = 'sales', //영업/영업관리
  FINANCE = 'finance', // 회계/재무/금융
  PLANNING = 'planning', // 전략/기획
  IT = 'it', // IT개발/데이터
  UX_UI = 'ux_ui', // 서비스 기획/UI, UX
  DESIGN = 'design', // 디자인/예술
  CONSULTING = 'consulting', // 교육/상담/컨설팅
  MANUFACTURING = 'manufacturing', // 생산/품질/제조
  ETC = 'etc', // 기타 사무
}
export type CategoryTabType = 'all' | MentoringCategory;

export const categoryIcons: Record<CategoryTabType, JSX.Element> = {
  all: <FiLayers size={24} className="mx-auto" />,
  hr: <FiUsers size={24} className="mx-auto" />,
  marketing: <FiTrendingUp size={24} className="mx-auto" />,
  pr: <FiMic size={24} className="mx-auto" />,
  sales: <FiBriefcase size={24} className="mx-auto" />,
  finance: <FiDollarSign size={24} className="mx-auto" />,
  planning: <FiTarget size={24} className="mx-auto" />,
  it: <FiCpu size={24} className="mx-auto" />,
  ux_ui: <FiEdit3 size={24} className="mx-auto" />,
  design: <FiFeather size={24} className="mx-auto" />,
  consulting: <FiBookOpen size={24} className="mx-auto" />,
  manufacturing: <FiTool size={24} className="mx-auto" />,
  etc: <FiBox size={24} className="mx-auto" />,
};
export const categoryLabelMap = {
  all: '전체',
  hr: '인사·총무',
  marketing: '마케팅',
  pr: '홍보',
  sales: '영업',
  finance: '재무',
  planning: '기획',
  it: '개발',
  ux_ui: 'UX·UI',
  design: '디자인',
  consulting: '상담·교육',
  manufacturing: '제조',
  etc: '기타',
};

export type MentoringSortType =
  | 'latest'
  | 'rating'
  | 'reviews'
  | 'likes'
  | 'mentor'
  | 'priceAsc'
  | 'priceDesc';

export const mentoringSortOptions: Option<MentoringSortType>[] = [
  { label: '최신순', value: 'latest' },
  { label: '평점순', value: 'rating' },
  { label: '리뷰순', value: 'reviews' },
  { label: '좋아요순', value: 'likes' },
  { label: '멘토가입순', value: 'mentor' },
  { label: '가격 낮은 순', value: 'priceAsc' },
  { label: '가격 높은 순', value: 'priceDesc' },
];

export const EXPERTISE_OPTIONS = [
  { label: '인사/총무/노무', value: MentoringCategory.HR },
  { label: '마케팅/MD', value: MentoringCategory.MARKETING },
  { label: '홍보/CSR', value: MentoringCategory.PR },
  { label: '영업/영업관리', value: MentoringCategory.SALES },
  { label: '회계/재무/금융', value: MentoringCategory.FINANCE },
  { label: '전략/기획', value: MentoringCategory.PLANNING },
  { label: 'IT개발/데이터', value: MentoringCategory.IT },
  { label: '서비스 기획/UI, UX', value: MentoringCategory.UX_UI },
  { label: '디자인/예술', value: MentoringCategory.DESIGN },
  { label: '교육/상담/컨설팅', value: MentoringCategory.CONSULTING },
  { label: '생산/품질/제조', value: MentoringCategory.MANUFACTURING },
  { label: '기타 사무', value: MentoringCategory.ETC },
];

export const MENTORING_OPTION_ALL: Option<CategoryTabType>[] = [
  { label: '전체', value: 'all' },
  ...EXPERTISE_OPTIONS,
];

type CareerValue = (typeof CAREER_OPTIONS)[number]['value'];
export const careerIconMap: Record<CareerValue, JSX.Element> = {
  junior: <FiZap />,
  middle: <FiBarChart2 />,
  senior: <FiAward />,
  lead: <FiStar />,
};

type PositionValue = (typeof POSITION_OPTIONS)[number]['value'];
export const positionIconMap: Record<PositionValue, JSX.Element> = {
  backend: <FiDatabase />,
  frontend: <FiMonitor />,
  fullstack: <FiLayers />,
  mobile: <FiSmartphone />,
  devops: <FiServer />,
  security: <FiShield />,
  data_engineer: <FiHardDrive />,
  data_scientist: <FiBarChart2 />,
  pm_po: <FiClipboard />,
  ux_designer: <FiUserCheck />,
  ui_designer: <FiPenTool />,
  planner: <FiFileText />,
  marketing: <FiTrendingUp />,
  hr: <FiUsers />,
  cs: <FiHeadphones />,
  finance: <FiDollarSign />,
  etc: <FiMoreHorizontal />,
};
