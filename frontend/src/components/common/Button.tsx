import clsx from 'clsx';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
  size?: 'large' | 'small';
  className?: string;
}

export default function Button({
  children,
  variant = 'solid',
  size = 'large',
  className,
  ...props
}: ButtonProps) {
  const buttonClass = clsx(
    'h-[50px] px-4 rounded-md text-sm font-medium transition-colors duration-200 text-center',
    size === 'large' && 'w-full',
    size === 'small' && 'h-9 w-20',
    variant === 'solid' && [
      'bg-[var(--primary-sub01)]  text-white',
      'hover:bg-[var(--primary)]',
    ],
    variant === 'outline' && [
      'bg-transparent border border-[var(--border-color)] text-[var(--text)]',
      'hover:bg-[var(--primary-sub01)] hover:text-white',
    ],
    className,
  );
  return (
    <button type="button" className={buttonClass} {...props}>
      {children}
    </button>
  );
}
