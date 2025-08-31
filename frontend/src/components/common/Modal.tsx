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
      <article className="scroll-custom relative mx-auto box-border max-h-[600px] w-[500px] overflow-y-auto rounded-lg bg-[var(--background)] p-5">
        <button type="button" onClick={onClose} className="absolute right-5">
          <IcClose className="stroke-[var(--text-bold)]" />
        </button>
        {children}
      </article>
    </section>
  );
}
