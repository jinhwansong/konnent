import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'danger' | 'wish' | 'wish-none';
  size?: 'lg' | 'full-h' | 'smWide' | 'sm' | 'full';
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
    ' px-4 rounded-md text-sm font-medium transition-colors duration-200 text-center',
    size === 'full' && 'w-full h-[50px]',
    size === 'lg' && 'w-[120px] h-[50px]',
    size === 'full-h' && 'w-full h-10',
    size === 'sm' && 'h-9 w-[80px]',
    size === 'smWide' && 'h-11 w-[100px]',
    variant === 'solid' && [
      'bg-[var(--primary-sub01)]  text-white',
      'hover:bg-[var(--primary)]',
    ],
    variant === 'outline' && [
      'bg-transparent border border-[var(--border-color)] ',
      'hover:bg-[var(--primary-sub01)] hover:text-white',
    ],
    variant === 'danger' && [
      'bg-white border border-red-300 text-red-500',
      'hover:bg-red-500 hover:text-white',
    ],
    variant === 'wish' && [
      'bg-[var(--primary-sub02)]',
      'border border-[var(--primary-sub04)]',
      'text-[var(--primary-sub04)]',
      'hover:bg-[var(--primary-sub04)] hover:text-white',
    ],
    variant === 'wish-none' && [
      'bg-transparent',
      'border border-[var(--border-color)]',
      'text-[var(--background-sub01)]',
      'hover:bg-[var(--primary-sub02)] hover:text-[var(--primary-sub04)]',
    ],
  );
  return (
    <button type="button" className={buttonClass} {...props}>
      {children}
    </button>
  );
}
