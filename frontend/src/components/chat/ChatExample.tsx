'use client';

import { useState } from 'react';
import ChatRoom from './ChatRoom';

/**
 * Example usage of ChatRoom component
 * 
 * This component demonstrates how to use the ChatRoom component
 * with proper user authentication and room management.
 */
export default function ChatExample() {
  const [isOpen, setIsOpen] = useState(false);

  // Example user data - replace with your actual user data from auth context
  const user = {
    id: 'user-123', // Get from auth context or session
    name: '홍길동',
    image: 'https://via.placeholder.com/40',
    isMentor: false,
  };

  // Example room ID - replace with actual room ID from props or route params
  const roomId = 'room-abc-123';

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">채팅 예제</h1>
      
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        채팅방 열기
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="h-[600px] w-full max-w-2xl rounded-lg bg-white shadow-xl">
            <ChatRoom
              roomId={roomId}
              user={user}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="mt-8 space-y-4 text-sm text-gray-600">
        <h2 className="text-lg font-semibold text-gray-900">사용 방법</h2>
        
        <div>
          <h3 className="font-medium text-gray-900">1. 기본 사용</h3>
          <pre className="mt-2 rounded-lg bg-gray-100 p-4">
{`import ChatRoom from '@/components/chat/ChatRoom';

<ChatRoom
  roomId="room-123"
  user={{
    id: 'user-456',
    name: '홍길동',
    image: 'https://...',
    isMentor: false,
  }}
  onClose={() => console.log('Chat closed')}
/>`}
          </pre>
        </div>

        <div>
          <h3 className="font-medium text-gray-900">2. 훅 직접 사용</h3>
          <pre className="mt-2 rounded-lg bg-gray-100 p-4">
{`import { useChatSocket } from '@/hooks/useChatSocket';

const {
  isConnected,
  isJoined,
  messages,
  users,
  sendMessage,
} = useChatSocket({
  roomId: 'room-123',
  user: {
    id: 'user-456',
    name: '홍길동',
    isMentor: false,
  },
  onNewMessage: (msg) => {
    console.log('New message:', msg);
  },
});`}
          </pre>
        </div>

        <div>
          <h3 className="font-medium text-gray-900">3. 인증 토큰 설정</h3>
          <p className="mt-2">
            소켓 연결 시 자동으로 localStorage 또는 쿠키에서 <code>accessToken</code>을 가져옵니다.
          </p>
          <pre className="mt-2 rounded-lg bg-gray-100 p-4">
{`// 로그인 후 토큰 저장
localStorage.setItem('accessToken', 'your-jwt-token');

// 또는 쿠키로 저장
document.cookie = 'accessToken=your-jwt-token';`}
          </pre>
        </div>

        <div>
          <h3 className="font-medium text-gray-900">4. 환경 변수 설정</h3>
          <pre className="mt-2 rounded-lg bg-gray-100 p-4">
{`# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000`}
          </pre>
        </div>
      </div>
    </div>
  );
}

