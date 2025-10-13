'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FiVideo, FiVideoOff, FiMic, FiMicOff } from 'react-icons/fi';

import { useWebRTC } from '@/hooks/useWebRTC';
import { useWebRTCSocket } from '@/hooks/useWebRTCSocket';


import AudioDebugger from './AudioDebugger';
import MicrophoneSelector from './MicrophoneSelector';
import MicrophoneTest from './MicrophoneTest';
import ScreenShareControls from './ScreenShareControls';
import ScreenShareIndicator from './ScreenShareIndicator';
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
  const { socket, users, notifyStreamReady } = useWebRTCSocket({
    roomId,
    user: {
      id: currentUser.id,
      name: currentUser.name,
      image: currentUser.image,
      isMentor: currentUser.isMentor || false,
    },
    enabled: !!session?.user,
  });
  const { 
    localStream, 
    remoteStreams,
    remoteTrackStates,
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
  });

  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [remoteScreenSharing, setRemoteScreenSharing] = useState<{userId: string, userName: string} | null>(null);
  const [testMode, setTestMode] = useState(false); // 테스트 모드: 자신의 목소리 들리게
  
  // Socket 기반 원격 사용자 트랙 상태
  const [remoteTrackStatesSocket, setRemoteTrackStatesSocket] = useState<Map<string, { isAudioEnabled: boolean; isVideoEnabled: boolean }>>(new Map());

  useEffect(() => {
    if (socket && session?.user) {
      initializeLocalStream().then(() => {
        // 스트림 준비 완료 알림
        notifyStreamReady();
        
        // 초기 트랙 상태 전송
        socket.emit('track_state_changed', {
          roomId,
          userId: session.user.id,
          isVideoEnabled: true,
          isAudioEnabled: true,
        });
      });
    }
  }, [socket, session, initializeLocalStream, notifyStreamReady, roomId]);

  // 마이크 디바이스 변경 핸들러
  const handleMicrophoneChange = async (deviceId: string) => {
    console.log('🎤 Changing microphone to:', deviceId);
    
    // 기존 스트림 정지
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    // 새 스트림 초기화
    await initializeLocalStream(deviceId);
    
    // 스트림 준비 완료 알림
    notifyStreamReady();
  };

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

    const handleTrackStateChanged = (data: { 
      userId: string; 
      isVideoEnabled: boolean; 
      isAudioEnabled: boolean; 
    }) => {
      console.log('📻 Received track state change:', data);
      if (data.userId !== session?.user?.id) {
        setRemoteTrackStatesSocket(prev => {
          const newMap = new Map(prev);
          newMap.set(data.userId, {
            isAudioEnabled: data.isAudioEnabled,
            isVideoEnabled: data.isVideoEnabled,
          });
          return newMap;
        });
      }
    };

    socket.on('screen_share_started', handleScreenShareStarted);
    socket.on('screen_share_stopped', handleScreenShareStopped);
    socket.on('track_state_changed', handleTrackStateChanged);

    return () => {
      socket.off('screen_share_started', handleScreenShareStarted);
      socket.off('screen_share_stopped', handleScreenShareStopped);
      socket.off('track_state_changed', handleTrackStateChanged);
    };
  }, [socket, session?.user?.id]);

  const handleToggleVideo = () => {
    toggleVideo();
    const newState = !isVideoEnabled;
    setIsVideoEnabled(newState);
    
    // Socket으로 비디오 상태 전송
    socket?.emit('track_state_changed', {
      roomId,
      userId: session?.user?.id,
      isVideoEnabled: newState,
      isAudioEnabled,
    });
  };

  const handleToggleAudio = () => {
    toggleAudio();
    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);
    
    // Socket으로 오디오 상태 전송
    socket?.emit('track_state_changed', {
      roomId,
      userId: session?.user?.id,
      isVideoEnabled,
      isAudioEnabled: newState,
    });
  };

  const handleScreenShare = () => {
    // 브라우저가 자체 선택 UI를 제공하므로 바로 시작
    startScreenShare('screen');
  };

  const handleStopScreenShare = () => {
    stopScreenShare();
  };

  // 실제 연결된 사용자 목록 (remoteStreams 기준)
  const connectedUsers = Array.from(remoteStreams.keys()).map(userId => {
    const user = users.find(u => u.id === userId);
    // Socket 기반 상태 우선, 없으면 WebRTC track 상태 사용
    const socketState = remoteTrackStatesSocket.get(userId);
    const trackState = remoteTrackStates.get(userId);
    const finalState = socketState || trackState;
    
    console.log('🎯 VideoGrid - Connected user state:', {
      userId,
      userName: user?.name || '상대방',
      socketState,
      trackState,
      finalState,
    });
    
    return {
      id: userId,
      name: user?.name || '상대방',
      image: user?.image,
      isMentor: user?.isMentor || false,
      isAudioEnabled: finalState?.isAudioEnabled ?? true,
      isVideoEnabled: finalState?.isVideoEnabled ?? true,
    };
  });
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
        {/* 현재 사용자  */}
        <VideoTile
          stream={localStream}
          user={currentUser}
          isLocal={!testMode} // 테스트 모드에서는 자신의 목소리 들림
          isVideoEnabled={isVideoEnabled}
          isAudioEnabled={isAudioEnabled}
          videoRef={localVideoRef as React.RefObject<HTMLVideoElement>}
          isScreenSharing={isScreenSharing}
        />

        {/* 연결된 모든 사용자 (상대방) */}
        {connectedUsers.length > 0 ? (
          connectedUsers.map((user) => (
            <VideoTile
              key={user.id}
              stream={remoteStreams.get(user.id) || null}
              user={user}
              isLocal={false}
              isVideoEnabled={user.isVideoEnabled}
              isAudioEnabled={user.isAudioEnabled}
              isScreenSharing={remoteScreenSharing?.userId === user.id}
            />
          ))
        ) : (
          <div className="flex items-center justify-center bg-[var(--card-bg)] rounded-xl">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[var(--primary-sub02)] border-t-[var(--primary)] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[var(--text)] font-semibold mb-2">상대방을 기다리는 중...</p>
              <p className="text-[var(--text-sub)] text-sm">상대방이 입장하면 화상 연결이 시작됩니다</p>
              <p className="text-[var(--text-sub)] text-xs mt-2">
                WebRTC 사용자: {users.length}명 대기 중
              </p>
            </div>
          </div>
        )}
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
             onStartShare={handleScreenShare}
             onStopShare={handleStopScreenShare}
           />

         
        </div>
      </div>

      {/* 화면 공유 상태 표시기 */}
      {remoteScreenSharing && (
        <ScreenShareIndicator
          isSharing={!!remoteScreenSharing}
          onStopShare={() => setRemoteScreenSharing(null)}
          userName={remoteScreenSharing.userName}
        />
      )}

      {/* 마이크 테스트 (항상 표시) */}
      <MicrophoneTest stream={localStream} />
      
      {/* 마이크 선택기 (항상 표시) */}
      <MicrophoneSelector onDeviceChange={handleMicrophoneChange} />

      {/* 오디오 디버거 (개발 중에만 표시) */}
      {process.env.NODE_ENV === 'development' && (
        <>
          <AudioDebugger stream={localStream} label="Local Stream" index={0} />
          {Array.from(remoteStreams.entries()).map(([userId, stream], idx) => (
            <AudioDebugger 
              key={userId} 
              stream={stream} 
              label={`Remote: ${users.find(u => u.id === userId)?.name || userId}`} 
              index={idx + 1}
            />
          ))}
          
          {/* 테스트 모드 토글 버튼 */}
          <button
            onClick={() => setTestMode(!testMode)}
            className={`fixed bottom-4 right-4 px-4 py-2 rounded-lg text-sm font-semibold transition-all z-50 ${
              testMode 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            {testMode ? '🔊 테스트 모드 ON (자신 목소리 들림)' : '🔇 테스트 모드 OFF'}
          </button>
        </>
      )}
    </div>
  );
}
