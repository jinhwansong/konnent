'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseSocketOptions {
  serverUrl?: string;
  autoConnect?: boolean;
}

interface ChatMessage {
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

interface RoomUser {
  id: string;
  name: string;
  image?: string;
  isMentor: boolean;
  isConnected: boolean;
}

export const useSocket = (roomId: string, options: UseSocketOptions = {}) => {
  const { serverUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', autoConnect = true } = options;
  
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [users, setUsers] = useState<RoomUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!autoConnect) return;

    // Socket.IO 클라이언트 연결
    const socket = io(serverUrl, {
      auth: {
        roomId,
      },
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    // 연결 이벤트
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setIsConnected(true);
      setError(null);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
      setError('연결에 실패했습니다.');
    });

    // 채팅 메시지 이벤트
    socket.on('message', (message: ChatMessage) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('messages', (messages: ChatMessage[]) => {
      setMessages(messages);
    });

    // 사용자 관련 이벤트
    socket.on('user_joined', (user: RoomUser) => {
      setUsers(prev => {
        const existingUser = prev.find(u => u.id === user.id);
        if (existingUser) {
          return prev.map(u => u.id === user.id ? { ...u, ...user } : u);
        }
        return [...prev, user];
      });

      // 시스템 메시지 추가
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        userId: 'system',
        userName: '시스템',
        isMentor: false,
        message: `${user.name}님이 참여했습니다.`,
        timestamp: new Date(),
        type: 'system',
      }]);
    });

    socket.on('user_left', (userId: string) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    });

    socket.on('users', (users: RoomUser[]) => {
      setUsers(users);
    });

    // WebRTC signaling 이벤트
    socket.on('offer', (data) => {
      // WebRTC offer 수신 (WebRTC 훅에서 처리)
      socket.emit('webrtc_event', { type: 'offer', data });
    });

    socket.on('answer', (data) => {
      // WebRTC answer 수신 (WebRTC 훅에서 처리)
      socket.emit('webrtc_event', { type: 'answer', data });
    });

    socket.on('ice_candidate', (data) => {
      // ICE candidate 수신 (WebRTC 훅에서 처리)
      socket.emit('webrtc_event', { type: 'ice_candidate', data });
    });

    // 정리 함수
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, serverUrl, autoConnect]);

  // 메시지 전송
  const sendMessage = (message: string, files?: File[]) => {
    if (!socketRef.current || !message.trim()) return;

    const messageData: Omit<ChatMessage, 'id' | 'timestamp'> = {
      userId: '', // 실제로는 현재 사용자 ID
      userName: '', // 실제로는 현재 사용자 이름
      userImage: '', // 실제로는 현재 사용자 이미지
      isMentor: false, // 실제로는 현재 사용자 역할
      message: message.trim(),
      type: files && files.length > 0 ? 'file' : 'text',
      fileUrl: files && files.length > 0 ? URL.createObjectURL(files[0]) : undefined,
      fileName: files && files.length > 0 ? files[0].name : undefined,
    };

    socketRef.current.emit('message', messageData);
  };

  // WebRTC signaling 메시지 전송
  const sendWebRTCMessage = (type: string, data: unknown) => {
    if (!socketRef.current) return;
    socketRef.current.emit(type, data);
  };

  // 방 참여
  const joinRoom = (userData: { id: string; name: string; image?: string; isMentor: boolean }) => {
    if (!socketRef.current) return;
    socketRef.current.emit('join_room', { roomId, userData });
  };

  // 방 나가기
  const leaveRoom = () => {
    if (!socketRef.current) return;
    socketRef.current.emit('leave_room', { roomId });
  };

  return {
    socket: socketRef.current,
    isConnected,
    messages,
    users,
    error,
    sendMessage,
    sendWebRTCMessage,
    joinRoom,
    leaveRoom,
  };
};
