import useErrorMessage from '@/hooks/useErrorMessage';
import clsx from 'clsx';
import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';

interface TextareaProp {
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
  className?: string;
  maxLength: number;
}

export default function Textarea({
  name,
  placeholder,
  rules,
  className,
  maxLength,
}: TextareaProp) {
  const { register } = useFormContext();
  const { ref, ...rest } = register(name, {
    ...rules,
    shouldUnregister: true,
  });
  const errorMessage = useErrorMessage(name);
  const textareaClass = clsx(
    'text-sm rounded-lg px-4 py-3 resize-none',
    'border transition-all duration-150',
    'focus:outline-none focus:border-[var(--primary)]',
    errorMessage
      ? 'border-red-500 focus:border-red-500'
      : 'border-[var(--border-color)]',
    className,
  );
  return (
    <>
      <textarea
        id={name}
        placeholder={placeholder}
        className={textareaClass}
        {...rest}
        ref={ref}
        maxLength={maxLength}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </>
  );
}
