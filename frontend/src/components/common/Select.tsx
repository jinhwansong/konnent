'use client';
import { useState, useRef } from 'react';
import clsx from 'clsx';
import { FiChevronDown } from 'react-icons/fi';
import useClickOutside from '@/hooks/useClickOutside';
import { Option } from '@/types/apply';

interface SelectProps<T extends string> {
  value?: T;
  onChange: (value: T) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
}

export default function Select<T extends string>({
  value,
  onChange,
  options,
  placeholder,
  className,
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useClickOutside(selectRef, () => setIsOpen(false));
  const selected = options.find((o) => o.value === value);

  return (
    <div className={`relative ${className || ''}`} ref={selectRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={clsx(
          'flex h-[50px] w-full items-center justify-between rounded-lg border px-4 text-sm transition-colors',
          'bg-[var(--editor-bg)] text-[var(--text)] placeholder-[var(--text-sub)]',
          'border-[var(--border-color)] hover:border-[var(--primary-sub01)]',
          'focus:border-[var(--primary)] focus:outline-none',
        )}
      >
        {selected?.label || (
          <span className="text-[var(--text-sub)]">{placeholder}</span>
        )}
        <FiChevronDown
          className={`ml-2 h-5 w-5 text-[var(--text-sub)] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-20 mt-2 max-h-[200px] w-full overflow-auto rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-2 py-2 shadow-lg">
          {options.map((item) => {
            const isActive = item.value === value;
            return (
              <li
                key={item.value}
                onClick={() => {
                  onChange(item.value as T);
                  setIsOpen(false);
                }}
                className={clsx(
                  'cursor-pointer rounded-md px-3 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-[var(--primary-sub02)] font-medium text-[var(--primary)]'
                    : 'text-[var(--text)] hover:bg-[var(--hover-bg)]',
                )}
              >
                {item.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
