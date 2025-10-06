'use client';

import { FiMonitor, FiX } from 'react-icons/fi';

interface ScreenShareIndicatorProps {
  isSharing: boolean;
  onStopShare: () => void;
  userName: string;
}

export default function ScreenShareIndicator({ isSharing, onStopShare, userName }: ScreenShareIndicatorProps) {
  if (!isSharing) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-[var(--primary-sub03)] text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-[var(--color-danger)] rounded-full animate-pulse" />
          <FiMonitor className="w-4 h-4" />
          <span className="text-sm font-medium">
            {userName}님이 화면을 공유하고 있습니다
          </span>
        </div>
        <button
          onClick={onStopShare}
          className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        >
          <FiX className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

