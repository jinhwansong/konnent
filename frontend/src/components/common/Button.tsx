import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'danger' | 'wish' | 'wish-none';
  size?: 'lg' | 'full-h' | 'smWide' | 'sm' | 'full' | 'sm-h';
  className?: string;
}

export default function Button({
  children,
  variant = 'solid',
  size = 'full',
  className,
  ...props
}: ButtonProps) {
  const buttonClass = clsx(
    className,
    'px-4 rounded-md text-sm font-medium transition-colors duration-200 text-center',
    size === 'full' && 'w-full h-[50px]',
    size === 'lg' && 'w-[120px] h-[50px]',
    size === 'full-h' && 'w-full h-10',
    size === 'sm' && 'h-10 w-[80px]',
    size === 'sm-h' && 'h-[50px] w-[80px]',
    size === 'smWide' && 'h-11 w-[100px]',

    // ✅ Solid
    variant === 'solid' && [
      'bg-[var(--primary)] text-white',
      'hover:bg-[color-mix(in oklch,var(--primary),black_15%)]',
      'disabled:bg-[var(--border-color)] disabled:text-[var(--text-sub)] disabled:cursor-not-allowed',
    ],

    // ✅ Outline
    variant === 'outline' && [
      'bg-transparent border border-[var(--border-color)] text-[var(--text)]',
      'hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--hover-bg)]',
      'disabled:bg-transparent disabled:text-[var(--text-sub)] disabled:border-[var(--border-color)] disabled:cursor-not-allowed',
    ],

    // ✅ Danger
    variant === 'danger' && [
      'border border-red-500 text-red-500 bg-transparent',
      'hover:bg-red-500 hover:text-white',
      'disabled:border-[var(--border-color)] disabled:text-[var(--text-sub)] disabled:cursor-not-allowed',
    ],

    // ✅ Wish
    variant === 'wish' && [
      'bg-[var(--primary-sub02)] border border-[var(--primary-sub04)] text-[var(--primary-sub04)]',
      'hover:bg-[var(--primary-sub04)] hover:text-white',
    ],

    // ✅ Wish None
    variant === 'wish-none' && [
      'bg-transparent border border-[var(--border-color)] text-[var(--text-sub)]',
      'hover:bg-[var(--hover-bg)] hover:text-[var(--primary-sub04)]',
    ],
  );
  return (
    <button type="button" className={buttonClass} {...props}>
      {children}
    </button>
  );
}
