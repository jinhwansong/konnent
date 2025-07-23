export interface UserProp {
  message: string;
  email: string;
  name: string;
  nickname: string;
  phone: string;
  image: string;
  role: string;
  accessToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface JoinInterface extends JoinRequest {
  passwordConfirm: string;
  code: string;
}

export interface JoinRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
  phone: string;
}

export interface DuplicateResponse {
  message: string;
}

export interface SendEmailVerificationRequest {
  email: string;
}
export interface VerifyEmailCodeRequest extends SendEmailVerificationRequest {
  code: string;
}
