import { cookies } from 'next/headers';
// 초기 채팅방정보
export async function getChatRoomData({ chatRoomId }: { chatRoomId: number }) {
  const cookieStore = cookies();
  const allCookies = cookieStore.getAll();
  const sessionCookie = cookieStore.get('connect.sid');

  console.log('세션 쿠키:', sessionCookie);

  const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join('; ');
  // 디버깅용 로그 추가
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/${chatRoomId}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieHeader,
        },
      }
    );
    const data = await response.json();
    console.log(allCookies, '데이터');
    return data;
  } catch (error) {
    throw error;
  }
}
