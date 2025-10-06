'use client';

import { useEffect } from 'react';
import { FiMessageCircle, FiUsers } from 'react-icons/fi';
import { useSession } from 'next-auth/react';

import VirtualizedList from '@/components/common/VirtualizedList';
import { useSocket } from '@/hooks/useSocket';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface User {
  id: string;
  name: string;
  image?: string;
  isMentor?: boolean;
}

interface ChatMessageData {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  isMentor: boolean;
  message: string;
  timestamp: Date;
  type: 'text' | 'system' | 'file';
  fileUrl?: string;
  fileName?: string;
}

interface ChatPanelProps {
  roomId: string;
  currentUser: User;
}

export default function ChatPanel({ roomId, currentUser }: ChatPanelProps) {
  const { data: session } = useSession();
  const { messages, users, isConnected, sendMessage, joinRoom } = useSocket(roomId);

  useEffect(() => {
    // 방 참여
    if (session?.user) {
      joinRoom({
        id: session.user.id,
        name: session.user.name || 'Unknown User',
        image: session.user.image || undefined,
        isMentor: currentUser.isMentor || false,
      });
    }
  }, [session, joinRoom, currentUser.isMentor]);

  const handleSendMessage = (message: string, files?: File[]) => {
    if (!message.trim() && (!files || files.length === 0)) return;
    sendMessage(message, files);
  };

  const renderMessage = (message: ChatMessageData) => (
    <ChatMessage
      key={message.id}
      message={message}
      isCurrentUser={message.userId === session?.user?.id}
    />
  );

  return (
    <div className="flex flex-col h-full bg-[var(--card-bg)]">
      {/* 채팅 헤더 */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--card-bg-sub)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--primary-sub02)] rounded-full flex items-center justify-center">
            <FiMessageCircle className="w-4 h-4 text-[var(--primary)]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-bold)]">채팅</h3>
            <p className="text-xs text-[var(--text-sub)]">
              {isConnected ? '연결됨' : '연결 중...'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 참여자 수 */}
          <div className="flex items-center gap-1 text-xs text-[var(--text-sub)]">
            <FiUsers className="w-3 h-3" />
            <span>{users.length}명</span>
          </div>
        </div>
      </div>

      {/* 가상화된 메시지 목록 */}
      <div className="flex-1 min-h-0">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <FiMessageCircle className="w-12 h-12 text-[var(--text-sub)] mx-auto mb-3" />
              <p className="text-[var(--text-sub)] text-sm">아직 메시지가 없습니다</p>
              <p className="text-[var(--text-sub)] text-xs">첫 메시지를 보내보세요!</p>
            </div>
          </div>
        ) : (
          <VirtualizedList
            data={messages}
            renderItem={renderMessage}
            className="px-4 py-3 space-y-3"
          />
        )}
      </div>

      {/* 메시지 입력 */}
      <div className="border-t border-[var(--border-color)] bg-[var(--card-bg)] flex-shrink-0">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
