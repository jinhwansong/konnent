'use client';

import clsx from 'clsx';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  variantSize?: 'xs' | 'sm' | 'md' | 'lg';
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      variantSize = 'lg',
      className,
      disabled = false,
      label,
      id,
      ...props
    },
    ref
  ) => {
    const inputClass = clsx(
      className,
      'text-sm h-[45px] rounded-lg px-4',
      'border transition-colors duration-200',
      'bg-[var(--editor-bg)] text-[var(--text)] placeholder-[var(--text-sub)]',
      'hover:border-[var(--primary-sub01)]',
      'focus:outline-none focus:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
      'disabled:bg-[var(--primary-sub02)] disabled:text-[var(--text-sub)] disabled:cursor-not-allowed',
      variantSize === 'lg' && 'w-full',
      variantSize === 'sm' && 'w-[150px]',
      error
        ? 'border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[color-mix(in_oklch,var(--danger),transparent_70%)]'
        : 'border-[var(--border-color)]'
    );

    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-sm font-medium text-[var(--text-bold)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClass}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1 text-sm text-[var(--danger)]"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default React.memo(Input);
