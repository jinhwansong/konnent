'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FiVideo, FiVideoOff, FiMic, FiMicOff } from 'react-icons/fi';

import { useSocket } from '@/hooks/useSocket';
import { useWebRTC } from '@/hooks/useWebRTC';

import ScreenShareControls from './ScreenShareControls';
import ScreenShareIndicator from './ScreenShareIndicator';
import ScreenShareModal from './ScreenShareModal';
import VideoTile from './VideoTile';

interface User {
  id: string;
  name: string;
  image?: string;
  isMentor?: boolean;
}

interface VideoGridProps {
  roomId: string;
  currentUser: User;
  isConnected: boolean;
}

export default function VideoGrid({ 
  roomId, 
  currentUser, 
  isConnected: _isConnected 
}: VideoGridProps) {
  const { data: session } = useSession();
  const { socket, users } = useSocket(roomId);
  const { 
    localStream, 
    remoteStreams, 
    isLoading, 
    error, 
    isScreenSharing,
    localVideoRef,
    initializeLocalStream, 
    toggleVideo, 
    toggleAudio, 
    startScreenShare,
    stopScreenShare 
  } = useWebRTC({
    roomId,
    userId: session?.user?.id || '',
    socket,
    isInitiator: true, // 첫 번째 사용자는 initiator
  });

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [showScreenShareModal, setShowScreenShareModal] = useState(false);
  const [remoteScreenSharing, setRemoteScreenSharing] = useState<{userId: string, userName: string} | null>(null);

  useEffect(() => {
    if (socket && session?.user) {
      initializeLocalStream();
    }
  }, [socket, session, initializeLocalStream]);

  // Socket 이벤트 리스너
  useEffect(() => {
    if (!socket) return;

    const handleScreenShareStarted = (data: { userId: string; userName: string }) => {
      if (data.userId !== session?.user?.id) {
        setRemoteScreenSharing(data);
      }
    };

    const handleScreenShareStopped = (data: { userId: string }) => {
      if (data.userId !== session?.user?.id) {
        setRemoteScreenSharing(null);
      }
    };

    socket.on('screen_share_started', handleScreenShareStarted);
    socket.on('screen_share_stopped', handleScreenShareStopped);

    return () => {
      socket.off('screen_share_started', handleScreenShareStarted);
      socket.off('screen_share_stopped', handleScreenShareStopped);
    };
  }, [socket, session?.user?.id]);

  const handleToggleVideo = () => {
    toggleVideo();
    setIsVideoEnabled(prev => !prev);
  };

  const handleToggleAudio = () => {
    toggleAudio();
    setIsAudioEnabled(prev => !prev);
  };

  const handleScreenShare = (source: 'screen' | 'window' | 'tab') => {
    startScreenShare(source);
  };

  const handleStopScreenShare = () => {
    stopScreenShare();
  };

  // 멘토 사용자 찾기 (실제로는 users 배열에서 찾아야 함)
  const mentorUser = users.find(user => user.isMentor) || {
    id: 'mentor-1',
    name: '김멘토',
    image: '/icon/default-avatar.png',
    isMentor: true,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--primary-sub02)] border-t-[var(--primary)] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--text-sub)]">화상 연결을 준비하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-[var(--color-danger)] mb-2">연결 오류</p>
          <p className="text-[var(--text-sub)] text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4">
      {/* 비디오 그리드 */}
      <div className="grid h-full grid-cols-2 gap-4">
        {/* 현재 사용자 (멘티) */}
        <VideoTile
          stream={localStream}
          user={currentUser}
          isLocal={true}
          isVideoEnabled={isVideoEnabled}
          isAudioEnabled={isAudioEnabled}
          videoRef={localVideoRef as React.RefObject<HTMLVideoElement>}
          isScreenSharing={isScreenSharing}
        />

        {/* 멘토 */}
        <VideoTile
          stream={remoteStreams.get(mentorUser.id) || null}
          user={mentorUser}
          isLocal={false}
          isVideoEnabled={true}
          isAudioEnabled={true}
          isScreenSharing={remoteScreenSharing?.userId === mentorUser.id}
        />
      </div>

      {/* 컨트롤 버튼들 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
        <div className="flex items-center gap-3 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)]/90 px-4 py-2 shadow-lg backdrop-blur-sm">
          {/* 비디오 토글 */}
           <button
             onClick={handleToggleVideo}
             className={`rounded-full p-2 transition-all ${
               isVideoEnabled
                 ? 'bg-[var(--card-bg-sub)] text-[var(--text)] hover:bg-[var(--hover-bg)]'
                 : 'bg-[var(--color-danger)] text-white hover:bg-red-600'
             }`}
           >
             {isVideoEnabled ? (
               <FiVideo className="h-4 w-4" />
             ) : (
               <FiVideoOff className="h-4 w-4" />
             )}
           </button>

           {/* 오디오 토글 */}
           <button
             onClick={handleToggleAudio}
             className={`rounded-full p-2 transition-all ${
               isAudioEnabled
                 ? 'bg-[var(--card-bg-sub)] text-[var(--text)] hover:bg-[var(--hover-bg)]'
                 : 'bg-[var(--color-danger)] text-white hover:bg-red-600'
             }`}
           >
             {isAudioEnabled ? (
               <FiMic className="h-4 w-4" />
             ) : (
               <FiMicOff className="h-4 w-4" />
             )}
           </button>

           {/* 화면 공유 컨트롤 */}
           <ScreenShareControls
             isSharing={isScreenSharing}
             onStartShare={() => setShowScreenShareModal(true)}
             onStopShare={handleStopScreenShare}
           />

         
        </div>
      </div>

      {/* 화면 공유 모달 */}
      <ScreenShareModal
        isOpen={showScreenShareModal}
        onClose={() => setShowScreenShareModal(false)}
        onStartShare={handleScreenShare}
      />

      {/* 화면 공유 상태 표시기 */}
      {remoteScreenSharing && (
        <ScreenShareIndicator
          isSharing={!!remoteScreenSharing}
          onStopShare={() => setRemoteScreenSharing(null)}
          userName={remoteScreenSharing.userName}
        />
      )}
    </div>
  );
}
