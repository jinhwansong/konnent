'use client';

import { useState } from 'react';
import { FiMonitor, FiX, FiShare2 } from 'react-icons/fi';

interface ScreenShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartShare: (source: 'screen' | 'window' | 'tab') => void;
}

export default function ScreenShareModal({ isOpen, onClose, onStartShare }: ScreenShareModalProps) {
  const [selectedSource, setSelectedSource] = useState<'screen' | 'window' | 'tab'>('screen');

  if (!isOpen) return null;

  const handleStartShare = () => {
    onStartShare(selectedSource);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[var(--card-bg)] rounded-2xl shadow-2xl border border-[var(--border-color)] w-full max-w-md mx-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--primary-sub02)] rounded-full flex items-center justify-center">
              <FiShare2 className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-bold)]">화면 공유</h2>
              <p className="text-sm text-[var(--text-sub)]">공유할 화면을 선택하세요</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--card-bg-sub)] hover:bg-[var(--hover-bg)] flex items-center justify-center transition-colors"
          >
            <FiX className="w-4 h-4 text-[var(--text-sub)]" />
          </button>
        </div>

        {/* 옵션 선택 */}
        <div className="p-6 space-y-4">
          {/* 전체 화면 */}
          <button
            onClick={() => setSelectedSource('screen')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              selectedSource === 'screen'
                ? 'border-[var(--primary)] bg-[var(--primary-sub02)]'
                : 'border-[var(--border-color)] bg-[var(--card-bg-sub)] hover:bg-[var(--hover-bg)]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedSource === 'screen' ? 'bg-[var(--primary)]' : 'bg-[var(--card-bg)]'
              }`}>
                <FiMonitor className={`w-6 h-6 ${selectedSource === 'screen' ? 'text-white' : 'text-[var(--text-sub)]'}`} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-[var(--text-bold)]">전체 화면</h3>
                <p className="text-sm text-[var(--text-sub)]">모든 화면을 공유합니다</p>
              </div>
            </div>
          </button>

          {/* 창 */}
          <button
            onClick={() => setSelectedSource('window')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              selectedSource === 'window'
                ? 'border-[var(--primary)] bg-[var(--primary-sub02)]'
                : 'border-[var(--border-color)] bg-[var(--card-bg-sub)] hover:bg-[var(--hover-bg)]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedSource === 'window' ? 'bg-[var(--primary)]' : 'bg-[var(--card-bg)]'
              }`}>
                <div className={`w-6 h-6 rounded border-2 ${selectedSource === 'window' ? 'border-white' : 'border-[var(--text-sub)]'}`} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-[var(--text-bold)]">창</h3>
                <p className="text-sm text-[var(--text-sub)]">특정 창을 공유합니다</p>
              </div>
            </div>
          </button>

          {/* 탭 */}
          <button
            onClick={() => setSelectedSource('tab')}
            className={`w-full p-4 rounded-xl border-2 transition-all ${
              selectedSource === 'tab'
                ? 'border-[var(--primary)] bg-[var(--primary-sub02)]'
                : 'border-[var(--border-color)] bg-[var(--card-bg-sub)] hover:bg-[var(--hover-bg)]'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedSource === 'tab' ? 'bg-[var(--primary)]' : 'bg-[var(--card-bg)]'
              }`}>
                <div className={`w-6 h-6 rounded-t border-2 ${selectedSource === 'tab' ? 'border-white' : 'border-[var(--text-sub)]'}`} />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-[var(--text-bold)]">탭</h3>
                <p className="text-sm text-[var(--text-sub)]">브라우저 탭을 공유합니다</p>
              </div>
            </div>
          </button>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 p-6 border-t border-[var(--border-color)]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-[var(--border-color)] text-[var(--text)] hover:bg-[var(--hover-bg)] transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleStartShare}
            className="flex-1 px-4 py-3 rounded-xl bg-[var(--primary)] text-white hover:bg-[var(--primary-sub01)] transition-colors font-medium"
          >
            공유 시작
          </button>
        </div>
      </div>
    </div>
  );
}

