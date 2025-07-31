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

interface SelectProp {
  name: string;
  options: Option[];
  placeholder?: string;
  rules?: RegisterOptions;
  className?: string;
  classNames?: string;
}

export default function Select({
  name,
  options,
  placeholder,
  rules,
  classNames,
  className,
}: SelectProp) {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useFormContext();
  const selectRef = useRef<HTMLDivElement>(null);
  useClickOutside(selectRef, () => setIsOpen(false));

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div
          className={`relative bg-[var(--background)] ${className}`}
          ref={selectRef}
        >
          <button
            className={clsx(
              classNames,
              'flex w-full items-center justify-between rounded-lg border border-[var(--border-color)] px-4 text-sm',
            )}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {options.find((o) => o.value === field.value)?.label || placeholder}
            <FiChevronDown
              className={`ml-2 h-5 w-5 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {isOpen && (
            <ul className="scroll-custom absolute z-20 mt-2 h-[150px] w-full overflow-auto rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-3 py-3">
              {options.map((item) => (
                <li
                  key={item.label}
                  onClick={() => {
                    field.onChange(item.value);
                    setIsOpen(false);
                  }}
                  className="cursor-pointer rounded-lg px-3 py-2.5 text-sm hover:bg-[var(--primary-sub02)]"
                >
                  {item.label}
                </li>
              ))}
            </ul>
          )}
          {fieldState.error && (
            <FieldErrorHandler fieldState={fieldState.error} />
          )}
        </div>
      )}
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
