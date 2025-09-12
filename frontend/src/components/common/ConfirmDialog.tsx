'use client';
import React from 'react';
import Button from './Button';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title = '정말 탈퇴하시겠습니까?',
  description = '탈퇴 후에는 계정을 복구할 수 없으며 모든 데이터가 삭제됩니다.',
  confirmText = '탈퇴하기',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* dialog */}
      <div className="relative z-10 w-[90%] max-w-sm rounded-xl bg-[var(--background)] p-6 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold text-[var(--text-bold)]">
          {title}
        </h2>
        <p className="mb-6 text-sm text-[var(--text-sub)]">{description}</p>

        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} variant="outline" size="smWide">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} variant="danger" size="smWide">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
