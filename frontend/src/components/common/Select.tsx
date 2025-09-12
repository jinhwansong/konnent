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
          'flex h-[50px] w-full items-center justify-between rounded-lg border border-[var(--border-color)] px-4 text-sm',
        )}
      >
        {selected?.label || placeholder}
        <FiChevronDown
          className={`ml-2 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-20 mt-2 max-h-[200px] w-full overflow-auto rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-3 py-3">
          {options.map((item) => (
            <li
              key={item.value}
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
    </div>
  );
}
