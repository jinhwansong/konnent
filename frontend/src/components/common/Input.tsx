'use client';
import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import clsx from 'clsx';

interface InputProps {
  /** RHF name속성 */
  name: string;
  /** input 타입인지 */
  type: string;
  /** register 를 호출할 때 지정하는 유효성 검사 규칙과 같은 포맷 */
  rules?: RegisterOptions;
  /** onChange 이벤트 등록 */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  /** register에서 받은 ref */
  innerRef?: React.RefObject<HTMLInputElement | null>;
  /** input의 너비 */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /**  */
  className?: string;
}

export default function Input({
  name,
  type,
  rules,
  size = 'lg',
  className,
  ...props
}: InputProps) {
  const { register } = useFormContext();
  const { ref, ...rest } = register(name, {
    ...rules,
    shouldUnregister: true,
  });
  const errorMessage = useErrorMessage(name);
  const inputClass = clsx(
    'text-sm h-[50px] rounded-lg px-4',
    'border transition-all duration-150',
    'focus:outline-none focus:border-[var(--primary)]',
    size === 'lg' && 'w-full',
    errorMessage
      ? 'border-red-500 focus:border-red-500'
      : 'border-[var(--border-color)]',
    className,
  );
  return (
    <>
      <input
        className={inputClass}
        id={name}
        type={type}
        placeholder={props.placeholder}
        {...rest}
        ref={ref}
      />

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </>
  );
}

function useErrorMessage(name: string) {
  const {
    formState: { errors },
  } = useFormContext();
  return (errors[name]?.message ?? '') as string;
}
