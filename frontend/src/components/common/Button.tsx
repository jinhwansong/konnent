import React from 'react';

import { cn } from '@/utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'danger' | 'wish' | 'wish-none';
  size?: 'lg' | 'full-h' | 'smWide' | 'sm' | 'full' | 'sm-h';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'solid',
      size = 'full',
      loading = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const buttonClass = cn(
      className,
      'px-4 rounded-md text-sm font-medium transition-colors duration-200 text-center focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
      size === 'full' && 'w-full h-[45px]',
      size === 'lg' && 'w-[120px] h-[45px]',
      size === 'full-h' && 'w-full h-10',
      size === 'sm' && 'h-[40px] w-[80px]',
      size === 'sm-h' && 'h-[45px] w-[80px]',
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
        'border border-[var(--danger)] text-[var(--danger)] bg-transparent',
        'hover:bg-[var(--danger)] hover:text-white',
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
      loading && 'cursor-wait'
    );

    return (
      <button
        ref={ref}
        type="button"
        className={buttonClass}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default React.memo(Button);
