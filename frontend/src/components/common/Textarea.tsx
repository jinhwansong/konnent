import clsx from 'clsx';
import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
  const textareaClass = clsx(
    'text-sm rounded-lg px-4 py-3 resize-none w-full min-h-28',
    'border transition-colors duration-200',
    'bg-[var(--editor-bg)] text-[var(--text)] placeholder-[var(--text-sub)]',
    'hover:border-[var(--primary-sub01)]',
    'focus:outline-none focus:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2',
    error
      ? 'border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[color-mix(in_oklch,var(--danger),transparent_70%)]'
      : 'border-[var(--border-color)]',
    className
  );

  const textareaId = id || props.name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={textareaId} className="block text-sm font-medium text-[var(--text-bold)] mb-2">
          {label}
        </label>
      )}
      <textarea 
        ref={ref}
        id={textareaId}
        className={textareaClass} 
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props} 
      />
      {error && (
        <p id={`${textareaId}-error`} className="mt-1 text-sm text-[var(--danger)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default React.memo(Textarea);
