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
  isMainScreen?: boolean;
  isSmall?: boolean;
}

export default function VideoTile({
  stream,
  user,
  isLocal,
  isVideoEnabled,
  isAudioEnabled,
  videoRef: externalVideoRef,
  isScreenSharing = false,
  isMainScreen = false,
  isSmall = false,
}: VideoTileProps) {
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  const videoRef = externalVideoRef || internalVideoRef;
  const [_isSpeaking, _setIsSpeaking] = useState(false);

  // 디버깅: props 확인
  ('🎬 VideoTile rendered:',
    {
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
              ('✅ Remote video playing with audio');
            })
            .catch(err => {
              console.warn('⚠️ Remote video autoplay failed:', err);
              // 사용자 인터랙션 후 재시도
              document.addEventListener(
                'click',
                () => {
                  videoElement.play().catch(console.error);
                },
                { once: true }
              );
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

  // 스타일 클래스 결정
  const containerClass = isMainScreen
    ? 'relative h-full w-full bg-black'
    : isSmall
      ? 'relative h-full w-full rounded-lg bg-[var(--primary-sub03)] shadow-sm'
      : 'relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-[var(--primary-sub03)] text-white shadow-md';

  return (
    <div className={containerClass}>
      {!isMainScreen && (
        <div className="text-center">
          <h3 className="mb-2 text-sm font-semibold">
            {user.isMentor ? '멘토 영상' : '멘티 영상'}
          </h3>
          <p className="text-xs text-gray-300">{user.name}</p>
          {!isVideoEnabled && (
            <p className="mt-2 text-xs text-gray-400">카메라가 꺼져있습니다</p>
          )}
        </div>
      )}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isLocal}
        controls={false}
        className={`absolute inset-0 h-full w-full object-cover ${
          !isVideoEnabled ? 'opacity-0' : ''
        }`}
        style={{ objectFit: 'cover' }}
      />

      {/* 사용자 정보와 상태 표시 */}
      <div
        className={`absolute ${isSmall ? 'right-2 bottom-2 left-2' : 'right-4 bottom-4 left-4'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ${isSmall ? 'h-6 w-6' : 'h-8 w-8'}`}
            >
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  className={`rounded-full object-cover ${isSmall ? 'h-5 w-5' : 'h-7 w-7'}`}
                  width={isSmall ? 20 : 28}
                  height={isSmall ? 20 : 28}
                />
              ) : (
                <svg
                  className={`text-white ${isSmall ? 'h-3 w-3' : 'h-4 w-4'}`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>

            {/* 사용자 이름과 역할 */}
            {!isSmall && (
              <div className="rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
                <p className="text-sm font-medium text-white">{user.name}</p>
                {user.isMentor && (
                  <span className="text-xs text-blue-300">멘토</span>
                )}
              </div>
            )}
          </div>

          {/* 상태 표시 */}
          <div className="flex items-center gap-2">
            {/* 오디오 상태: 켜짐=초록, 꺼짐=빨강 */}
            <div
              className={`rounded-full ${isSmall ? 'h-2 w-2' : 'h-3 w-3'} ${
                isAudioEnabled ? 'bg-green-500' : 'bg-red-500'
              }`}
              title={isAudioEnabled ? '오디오 켜짐' : '오디오 꺼짐'}
            />

            {_isSpeaking && (
              <div
                className={`animate-pulse rounded-full bg-[var(--color-warning)] ${isSmall ? 'h-2 w-2' : 'h-3 w-3'}`}
              />
            )}

            {isLocal && !isSmall && (
              <div className="rounded-full bg-[var(--primary)] px-2 py-1 text-xs text-white">
                나
              </div>
            )}

            {/* 화면 공유 상태 표시 */}
            {isScreenSharing && !isSmall && (
              <div className="flex items-center gap-1 rounded-full bg-[var(--color-info)] px-2 py-1 text-xs text-white">
                <FiMonitor className="h-3 w-3" />
                <span>화면 공유</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 네트워크 상태 표시 (작은 화면에서는 숨김) */}
      {!isSmall && (
        <div className="absolute top-4 right-4">
          <div className="rounded-full bg-black/50 px-2 py-1 backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-xs text-white">HD</span>
            </div>
          </div>
        </div>
      )}

      {/* 로딩 상태 */}
      {!stream && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div
              className={`mx-auto mb-4 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500 ${isSmall ? 'h-6 w-6' : 'h-12 w-12'}`}
            />
            <p className={`text-white ${isSmall ? 'text-xs' : 'text-sm'}`}>
              연결 중...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
