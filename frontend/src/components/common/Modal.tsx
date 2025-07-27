import Link from 'next/link';
import React from 'react';
import IcClose from '@/assets/close.svg';

export default function Modal({
  children,
  link,
}: {
  children: React.ReactNode;
  link: string;
}) {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <article className="scroll-custom relative mx-auto box-border h-[600px] w-[500px] overflow-y-auto rounded-lg bg-[var(--background)] p-5">
        <Link href={link} className="absolute right-5">
          <IcClose className="stroke-[var(--text-bold)]" />
        </Link>
        {children}
      </article>
    </section>
  );
}
