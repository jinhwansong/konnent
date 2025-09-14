import React from 'react';
import clsx from 'clsx';

interface TextareaProp
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export default function Textarea({ className, error, ...props }: TextareaProp) {
  const textareaClass = clsx(
    'text-sm rounded-lg px-4 py-3 resize-none w-full min-h-32',
    'border transition-all duration-150',
    'bg-[var(--editor-bg)] text-[var(--text)] placeholder-[var(--text-sub)]',
    'hover:border-[var(--primary-sub01)]',
    'focus:outline-none focus:border-[var(--primary)] ',
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
      : 'border-[var(--border-color)]',
    className,
  );
  return <textarea className={textareaClass} {...props} />;
}
