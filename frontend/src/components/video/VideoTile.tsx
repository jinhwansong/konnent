'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FiMonitor } from 'react-icons/fi';

interface User {
  id: string;
  name: string;
  image?: string;
  isMentor?: boolean;
}

interface VideoTileProps {
  stream: MediaStream | null;
  user: User;
  isLocal: boolean;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  videoRef?: React.RefObject<HTMLVideoElement>;
  isScreenSharing?: boolean;
}

export default function VideoTile({
  stream,
  user,
  isLocal,
  isVideoEnabled,
  isAudioEnabled,
  videoRef: externalVideoRef,
  isScreenSharing = false,
}: VideoTileProps) {
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = externalVideoRef || internalVideoRef;
  const [_isSpeaking, _setIsSpeaking] = useState(false);
  
  // 디버깅: props 확인
  console.log('🎬 VideoTile rendered:', {
    userName: user.name,
    isLocal,
    isAudioEnabled,
    isVideoEnabled,
    hasStream: !!stream,
  });

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement && stream) {
      videoElement.srcObject = stream;
      
      // 원격 비디오의 경우 명시적으로 재생 및 음소거 해제
      if (!isLocal) {
        videoElement.muted = false;
        videoElement.volume = 1.0;
        
        // play() 호출을 조금 지연시켜 확실하게 재생
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('✅ Remote video playing with audio');
            })
            .catch(err => {
              console.warn('⚠️ Remote video autoplay failed:', err);
              // 사용자 인터랙션 후 재시도
              document.addEventListener('click', () => {
                videoElement.play().catch(console.error);
              }, { once: true });
            });
        }
      }
    }
  }, [stream, videoRef, isLocal]);

  // 오디오 레벨 모니터링 (실제로는 Web Audio API 사용)
  useEffect(() => {
    if (stream && !isLocal) {
      // TODO: 오디오 레벨 감지 로직 구현
      _setIsSpeaking(false);
    }
  }, [stream, isLocal]);

  return (
    <div className="relative bg-[var(--primary-sub03)] rounded-xl shadow-md aspect-video overflow-hidden flex items-center justify-center text-white">
      <div className="text-center">
        <h3 className="text-sm font-semibold mb-2">
          {user.isMentor ? '멘토 영상' : '멘티 영상'}
        </h3>
        <p className="text-xs text-gray-300">{user.name}</p>
        {!isVideoEnabled && (
          <p className="text-xs text-gray-400 mt-2">카메라가 꺼져있습니다</p>
        )}
      </div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        controls={false}
        className={`w-full h-full object-cover absolute inset-0 ${
          !isVideoEnabled ? 'opacity-0' : ''
        }`}
        style={{ objectFit: 'cover' }}
      />

      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                  width={28}
                  height={28}
                />
              ) : (
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>

            {/* 사용자 이름과 역할 */}
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
              <p className="text-white text-sm font-medium">{user.name}</p>
              {user.isMentor && (
                <span className="text-blue-300 text-xs">멘토</span>
              )}
            </div>
          </div>

          {/* 상태 표시 */}
          <div className="flex items-center gap-2">
            {/* 오디오 상태: 켜짐=초록, 꺼짐=빨강 */}
            <div 
              className={`w-3 h-3 rounded-full ${
                isAudioEnabled ? 'bg-green-500' : 'bg-red-500'
              }`}
              title={isAudioEnabled ? '오디오 켜짐' : '오디오 꺼짐'}
            />

            {_isSpeaking && (
              <div className="w-3 h-3 bg-[var(--color-warning)] rounded-full animate-pulse" />
            )}

              {isLocal && (
                <div className="bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-full">
                  나
                </div>
              )}
              
              {/* 화면 공유 상태 표시 */}
              {isScreenSharing && (
                <div className="bg-[var(--color-info)] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <FiMonitor className="w-3 h-3" />
                  <span>화면 공유</span>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* 네트워크 상태 표시 */}
      <div className="absolute top-4 right-4">
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-white text-xs">HD</span>
          </div>
        </div>
      </div>

      {/* 로딩 상태 */}
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-sm">연결 중...</p>
          </div>
        </div>
      )}
    </div>
  );
}
