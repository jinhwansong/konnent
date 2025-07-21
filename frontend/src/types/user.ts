export interface UserProp {
  message: string;
  email: string;
  name: string;
  nickname: string;
  phone: string;
  image: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
