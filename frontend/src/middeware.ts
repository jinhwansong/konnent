import { NextResponse } from 'next/server';
import { auth } from './auth';

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect('http://localhost:3000/login');
  }
  console.log(session);
}

export const config = {
  // 로그인을 해야만 들어갈수 잇는 페이지
  matcher: ['/messages', '/mypage'],
};
