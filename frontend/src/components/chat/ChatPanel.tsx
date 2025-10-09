'use client';

import { FiMessageCircle, FiUsers } from 'react-icons/fi';

import VirtualizedList from '@/components/common/VirtualizedList';
import { useChatSocket } from '@/hooks/useChatSocket';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';


interface User {
  id: string;
  name: string;
  image?: string;
  isMentor?: boolean;
}

interface ChatPanelProps {
  roomId: string;
  currentUser: User;
}

export default function ChatPanel({ roomId, currentUser }: ChatPanelProps) {
  const { messages, users, isConnected, sendMessage } = useChatSocket({
    roomId,
    user: {
      id: currentUser.id,
      name: currentUser.name,
      image: currentUser.image,
      isMentor: currentUser.isMentor || false,
    },
    enabled: true,
  });
  const handleSendMessage = (message: string, files?: File[]) => {
    if (!message.trim() && (!files || files.length === 0)) return;
    
    // TODO: 파일 업로드 로직 추가
    if (files && files.length > 0) {
      // 파일을 서버에 업로드하고 URL을 받아서 전송
      console.log('Files to upload:', files);
      // For now, just send the message
      sendMessage(message);
    } else {
      sendMessage(message);
    }
  };
  return (
    <div className="flex h-full flex-col bg-[var(--card-bg)]">
      {/* 채팅 헤더 */}
      <div className="flex flex-shrink-0 items-center justify-between border-b border-[var(--border-color)] bg-[var(--card-bg-sub)] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary-sub02)]">
            <FiMessageCircle className="h-4 w-4 text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-bold)]">
              채팅
            </h3>
            <p className="text-xs text-[var(--text-sub)]">
              {isConnected ? '연결됨' : '연결 중...'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 참여자 수 */}
          <div className="flex items-center gap-1 text-xs text-[var(--text-sub)]">
            <FiUsers className="h-3 w-3" />
            <span>{users.length}명</span>
          </div>
        </div>
      </div>

      {/* 가상화된 메시지 목록 */}
      <div className="min-h-0 flex-1">
        <VirtualizedList
          mode="chat"
          data={messages}
          emptyText="아직 메시지가 없습니다"
          renderItem={(item, _index) => {
            const messageWithDate = {
              ...item,
              timestamp:
                typeof item.timestamp === 'string'
                  ? new Date(item.timestamp)
                  : item.timestamp,
            };
            return (
              <div className="px-4 py-2">
                <ChatMessage
                  message={messageWithDate}
                  isCurrentUser={item.userId === currentUser.id}
                />
              </div>
            );
          }}
        />
      </div>

      {/* 메시지 입력 */}
      <div className="flex-shrink-0 border-t border-[var(--border-color)] bg-[var(--card-bg)]">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
