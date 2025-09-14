import React from 'react';
import IcClose from '@/assets/close.svg';

export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <article className="relative mx-auto box-border flex h-[600px] w-[500px] flex-col overflow-y-auto rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
        <button type="button" onClick={onClose} className="absolute right-5">
          <IcClose className="stroke-[var(--text-bold)]" />
        </button>
        {children}
      </article>
    </section>
  );
}
