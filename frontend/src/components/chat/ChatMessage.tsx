'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

interface ChatMessageProps {
  message: {
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
  };
  isCurrentUser: boolean;
}

export default function ChatMessage({ message, isCurrentUser }: ChatMessageProps) {
  // 시스템 메시지 처리
  if (message.type === 'system') {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="bg-[var(--card-bg-sub)] text-[var(--text-sub)] text-xs px-3 py-1 rounded-full">
          {message.message}
        </div>
      </div>
    );
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return '🖼️';
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📎';
    }
  };

  return (
    <div className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* 프로필 이미지 */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-[var(--card-bg-sub)] flex items-center justify-center">
          {message.userImage ? (
            <Image
              src={message.userImage}
              alt={message.userName}
              className="w-full h-full object-cover"
              width={32}
              height={32}
            />
          ) : (
            <div className="w-5 h-5 text-[var(--text-sub)] bg-[var(--primary-sub02)] rounded-full flex items-center justify-center text-xs font-medium">
              {message.userName.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* 메시지 컨텐츠 */}
      <div className={`flex flex-col gap-1 max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        {/* 사용자 이름 (다른 사람 메시지일 때만) */}
        {!isCurrentUser && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[var(--text)]">
              {message.userName}
            </span>
            {message.isMentor && (
              <span className="text-xs bg-[var(--primary-sub02)] text-[var(--primary)] px-2 py-0.5 rounded-full">
                멘토
              </span>
            )}
          </div>
        )}

        {/* 메시지 말풍선 */}
        <div
          className={`px-3 py-2 rounded-2xl text-sm ${
            isCurrentUser
              ? 'bg-[var(--primary)] text-white rounded-br-md'
              : message.isMentor
              ? 'bg-[var(--primary-sub02)] text-[var(--text-bold)] rounded-bl-md border border-[var(--primary-sub02)]'
              : 'bg-[var(--card-bg-sub)] text-[var(--text-bold)] rounded-bl-md'
          }`}
        >
          {/* 파일 메시지 처리 */}
          {message.type === 'file' && message.fileUrl && message.fileName ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{getFileIcon(message.fileName)}</span>
                <span className="text-sm font-medium">{message.fileName}</span>
              </div>
              {message.message && (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.message}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {message.message}
            </p>
          )}
        </div>

        {/* 시간 */}
        <div className={`text-xs text-[var(--text-sub)] ${isCurrentUser ? 'text-right' : 'text-left'}`}>
          {format(message.timestamp, 'HH:mm', { locale: ko })}
        </div>
      </div>
    </div>
  );
}