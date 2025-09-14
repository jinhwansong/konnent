'use client';
import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  variantSize?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function Input({
  error,
  variantSize = 'lg',
  className,
  disabled = false,
  ...props
}: InputProps) {
  const inputClass = clsx(
    className,
    'text-sm h-[50px] rounded-lg px-4',
    'border  transition-all duration-150',
    'bg-[var(--editor-bg)] text-[var(--text)] placeholder-[var(--text-sub)]',
    'hover:border-[var(--primary-sub01)]',
    'focus:outline-none focus:border-[var(--primary)] ',
    'disabled:bg-[var(--primary-sub02)] disabled:text-[var(--text-sub)] disabled:cursor-not-allowed',
    variantSize === 'lg' && 'w-full',
    variantSize === 'sm' && 'w-[150px]',
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
      : 'border-[var(--border-color)]',
  );
  return <input className={inputClass} disabled={disabled} {...props} />;
}
