import React from 'react'
import { getChatRoomData } from '@/app/_lib/useActions';

import ChatRoom from '../../_component/ChatRoom';

export default async function page({ params }: { params: { id: string } }) {
  const chatRoomId = params.id
  try {
    // 프록시 API 라우트로 요청
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/proxy/chat/${chatRoomId}`,
      {
        cache: 'no-store',
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error(`채팅룸 데이터 로드 실패: ${response.status}`);
    }

    const data = await response.json();
    return <ChatRoom data={data} />;
  } catch (error) {
    // console.error('채팅룸 페이지 오류:', error);
    return <div>채팅룸 데이터를 불러오는데 문제가 발생했습니다.</div>;
  }
}
