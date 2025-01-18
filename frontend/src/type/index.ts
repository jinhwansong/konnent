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
export interface IMentorApprovalParams {
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
// 마이페이지 
export interface InfoField  {
  label: string;
  data: string | undefined;
  onButton?: () => void;
  onSave?: () => void;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};
// 마이페이지 
interface IBaseField {
  label: string;
  data: string;
  isEditing?: boolean;
  handleEdit?: () => void;  
  handleSave?: () => void;  
  handleCancel?: () => void; 
  
}
export interface IInfoItem extends IBaseField {
  placeholder?: string;
  type?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  checkPasswordLabel?: string;
  checkPasswordData?: string;
  checkPasswordOnChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  checkPasswordPlaceholder?: string;
  checkPasswordError?: string;
  newPasswordLabel?: string;
  newPasswordData?: string;
  newPasswordOnChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  newPasswordPlaceholder?: string;
  newPasswordError?: string;
  sns?:string;
}
export interface ICareerItem extends IBaseField {
  options: string[];
  onSelet: (newValue: string) => void;
  popup: boolean;
  onPopup: () => void;
  seletText:string;
}
