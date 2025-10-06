'use client';

import { FiMonitor, FiMaximize2, FiCameraOff } from 'react-icons/fi';

interface ScreenShareControlsProps {
  isSharing: boolean;
  onStartShare: () => void;
  onStopShare: () => void;
  onToggleFullscreen?: () => void;
  isFullscreen?: boolean;
}

export default function ScreenShareControls({
  isSharing,
  onStartShare,
  onStopShare,
  onToggleFullscreen,
  isFullscreen = false
}: ScreenShareControlsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* 화면 공유 버튼 */}
      <button
        onClick={isSharing ? onStopShare : onStartShare}
        className={`p-2 rounded-full transition-all ${
          isSharing
            ? 'bg-[var(--color-danger)] text-white hover:bg-red-600'
            : 'bg-[var(--card-bg-sub)] text-[var(--text)] hover:bg-[var(--hover-bg)]'
        }`}
        title={isSharing ? '화면 공유 중지' : '화면 공유 시작'}
      >
        {isSharing ? (
          <FiCameraOff className="w-4 h-4" />
        ) : (
          <FiMonitor className="w-4 h-4" />
        )}
      </button>

      {/* 전체화면 토글 (공유 중일 때만 표시) */}
      {isSharing && onToggleFullscreen && (
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-full bg-[var(--card-bg-sub)] text-[var(--text)] hover:bg-[var(--hover-bg)] transition-all"
          title={isFullscreen ? '전체화면 종료' : '전체화면'}
        >
          <FiMaximize2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
