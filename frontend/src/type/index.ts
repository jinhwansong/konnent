export interface IErr extends Error{
  code: number;
  data: string
  seccess: boolean
}
export interface IAdminUsers {
  id:number;
  createdAt: string;
  email: string;
  name: string;
  role: string;
  snsId: string;
  image: string | null;
  phone: string;
  nickname:string;
}
export interface IColumn {
  id: number;
  name: string;
  key:any;
  render?: (item: any) => React.ReactNode;
}
export interface IAdminMentors {
  id: number;
  createdAt: string;
  email: string;
  name: string;
  image: string | null;
  job: string;
  career: string;
  status: string;
}

export interface ITables<T = IAdminUsers | IAdminMentors> {
  page: T[];
  message: string;
  totalPage:number;
}

export interface IPage {
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onPage: (page: number) => void;
}
export interface IPages extends IPage {
  totalPage: number;
}
export interface MentorApprovalParams {
  approved: boolean;
  reason?: string;
  id: number;
}


export interface IMentorMutation {
  email: string;
  job: string;
  introduce: string;
  portfolio: string;
  career: string;
}