import React from 'react';
import { Option } from '@/types/apply';

interface CheckboxGroupProps<T = string> {
  value: T[] | T | undefined;
  onChange: (value: T[] | T) => void;
  options: Option<T>[];
  type: 'radio' | 'checkbox';
  className?: string;
}

export default function CheckboxGroup<T = string>({
  value,
  onChange,
  options,
  type,
  className,
}: CheckboxGroupProps<T>) {
  return (
    <div className={className}>
      {options.map((item) => {
        const isChecked =
          type === 'radio'
            ? value !== undefined && isEqual(value as T, item.value)
            : Array.isArray(value) && value.some((v) => isEqual(v, item.value));
        return (
          <label
            key={JSON.stringify(item.value)}
            className={`h-10 cursor-pointer rounded-lg border px-3 text-sm leading-10 ${isChecked ? 'border-[var(--primary)] bg-[var(--primary)] text-white' : 'border-[var(--primary-sub02)] bg-[var(--primary-sub02)]'} hover:border-[var(--primary)] hover:bg-[var(--primary-sub02)] hover:text-[var(--primary)]`}
          >
            <input
              type={type}
              hidden
              checked={isChecked}
              onChange={(e) => {
                const checked = e.target.checked;

                if (type === 'radio') {
                  onChange(item.value);
                } else {
                  const newValue = checked
                    ? ([...((value as T[]) ?? []), item.value] as T[])
                    : (value as T[]).filter((v) => !isEqual(v, item.value));
                  onChange(newValue);
                }
              }}
            />
            {item.label}
          </label>
        );
      })}
    </div>
  );
}

function isEqual<T>(a: T, b: T) {
  return JSON.stringify(a) === JSON.stringify(b);
}
