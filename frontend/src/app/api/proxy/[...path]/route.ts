import { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  return proxy(req);
}
export async function POST(req: NextRequest) {
  return proxy(req);
}
export async function PATCH(req: NextRequest) {
  return proxy(req);
}
export async function DELETE(req: NextRequest) {
  return proxy(req);
}

async function proxy(req: NextRequest): Promise<Response> {
  const backendUrl = process.env.NEXT_PUBLIC_AUTH_URL!;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  });
  const path = req.nextUrl.pathname.replace(/^\/api\/proxy/, '');
  const url = `${backendUrl}${path}${req.nextUrl.search}`;

  // 헤더 복사
  const headers = new Headers(req.headers);
  headers.set('host', new URL(backendUrl).host);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  // fetch를 그대로 넘김
  const res = await fetch(url, {
    method: req.method,
    headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    redirect: 'manual',
    ...(req.method !== 'GET' && req.method !== 'HEAD'
      ? { duplex: 'half' }
      : {}),
  });

  const responseBody = await res.arrayBuffer();

  return new Response(responseBody, {
    status: res.status,
    headers: res.headers,
  });
}
