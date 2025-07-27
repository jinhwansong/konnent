'use client';
import React, { useState } from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { Option } from '@/types/apply';

interface SelectProp {
  name: string;
  options: Option[];
  placeholder?: string;
  rules?: RegisterOptions;
  className?: string;
}

export default function Select({
  name,
  options,
  placeholder,
  rules,
}: SelectProp) {
  const [isOpen, setIsOpen] = useState(false);
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="w-full">
          <button
            className="h-[50px] w-full rounded-lg border border-[var(--border-color)] px-4 text-sm"
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {options.find((o) => o.value === field.value)?.label || placeholder}
          </button>
          {isOpen && (
            <ul className="mt-2 rounded-lg border border-[var(--border-color)] px-3 py-3">
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
            <p className="mt-1 text-sm text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
