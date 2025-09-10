'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Controller,
  FieldError,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import { Option } from '@/types/apply';
import { FiChevronDown } from 'react-icons/fi';
import useClickOutside from '@/hooks/useClickOutside';
import { useToastStore } from '@/stores/useToast';
import clsx from 'clsx';

// 공통 내부 컴포넌트
interface SelectUIProps<T extends string> {
  value?: T;
  onChange: (value: T) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  error?: FieldError;
}

function SelectUI<T extends string>({
  value,
  onChange,
  options,
  placeholder,
  className,
  error,
}: SelectUIProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useClickOutside(selectRef, () => setIsOpen(false));

  const selected = options.find((o) => o.value === value);

  return (
    <div
      className={`relative bg-[var(--background)] ${className || ''}`}
      ref={selectRef}
    >
      <button
        className={clsx(
          'flex h-[50px] w-full items-center justify-between rounded-lg border border-[var(--border-color)] px-4 text-sm',
        )}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected?.label || placeholder}
        <FiChevronDown
          className={`ml-2 h-5 w-5 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <ul
          className={clsx(
            'scroll-custom absolute z-20 mt-2 w-full overflow-auto rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-3 py-3',
            'max-h-[200px]',
          )}
        >
          {options.map((item) => (
            <li
              key={item.label}
              onClick={() => {
                onChange(item.value as T);
                setIsOpen(false);
              }}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm hover:bg-[var(--primary-sub02)]"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
      {error && <FieldErrorHandler fieldState={error} />}
    </div>
  );
}

// Form용 props
interface FormSelectProps {
  name: string;
  rules?: RegisterOptions;
  value?: never;
  onChange?: never;
}

// 일반용 props
interface StandardSelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  name?: never;
  rules?: never;
}

// 공통 props
interface BaseSelectProps {
  options: Option[];
  placeholder?: string;
  className?: string;
}

type SelectProps<T extends string = string> = BaseSelectProps &
  (FormSelectProps | StandardSelectProps<T>);

// 메인 Select 컴포넌트
export default function Select<T extends string = string>(
  props: SelectProps<T>,
) {
  // Form 모드인지 확인
  if ('name' in props && props.name) {
    return <FormSelect {...props} />;
  }

  // 일반 모드
  return (
    <StandardSelect {...(props as StandardSelectProps<T> & BaseSelectProps)} />
  );
}

// Form용 Select
function FormSelect({
  name,
  options,
  placeholder,
  rules,
  className,
}: FormSelectProps & BaseSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <SelectUI
          value={field.value}
          onChange={field.onChange}
          options={options}
          placeholder={placeholder}
          className={className}
          error={fieldState.error}
        />
      )}
    />
  );
}

// 일반용 Select
function StandardSelect<T extends string>({
  value,
  onChange,
  options,
  placeholder,
  className,
}: StandardSelectProps<T> & BaseSelectProps) {
  return (
    <SelectUI
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      className={className}
    />
  );
}

function FieldErrorHandler({ fieldState }: { fieldState: FieldError }) {
  const { showToast } = useToastStore();

  useEffect(() => {
    if (fieldState) {
      showToast(fieldState.message as string, 'error');
    }
  }, [fieldState, showToast]);

  return null;
}
