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
  defaultValue?: string | number;
  /** register에서 받은 ref */
  innerRef?: React.RefObject<HTMLInputElement | null>;
  /** input의 너비 */
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function Input({
  name,
  type,
  rules,
  size = 'lg',
  ...props
}: InputProps) {
  const methods = useFormContext();
  const { register, setValue } = methods;
  const { ref, ...rest } = register(name, {
    onChange: (e) => {
      setValue(name, e.target.value);
      props.onChange?.(e);
    },
    ...rules,
    shouldUnregister: true,
  });
  const errorMessage = useErrorMessage(name);
  const inputClass = clsx(
    'text-sm h-12 rounded-lg px-4 border border-[var(--border-color)]',
    'focus:outline-none focus:border-[var(--primary)]',
    'transition-all duration-150',
    size === 'lg' && 'w-full',
  );
  return (
    <>
      <input
        className={inputClass}
        id={name}
        type={type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        ref={(el) => {
          ref(el);
          if (props.innerRef) props.innerRef.current = el;
        }}
        {...rest}
      />

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </>
  );
}

function useErrorMessage(name: string) {
  const { formState } = useFormContext();
  try {
    return formState.errors?.[name]?.message as string | undefined;
  } catch {
    return undefined;
  }
}
