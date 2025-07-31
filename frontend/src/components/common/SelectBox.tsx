'use client';
import { useRef, useState } from 'react';
import { Option } from '@/types/apply';
import { FiChevronDown } from 'react-icons/fi';
import useClickOutside from '@/hooks/useClickOutside';

interface SelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: Option<T>[];
  placeholder?: string;
  className?: string;
}

export default function SelectBox<T extends string>({
  value,
  onChange,
  options,
  placeholder,
  className = '',
}: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((o) => o.value === value);
  const selectRef = useRef<HTMLDivElement>(null);
  useClickOutside(selectRef, () => setIsOpen(false));
  return (
    <div
      className={`relative ${className} bg-[var(--background)]`}
      ref={selectRef}
    >
      <button
        type="button"
        className="flex h-[50px] w-full items-center justify-between rounded-lg border border-[var(--border-color)] px-4 text-sm"
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
        <ul className="absolute mt-2 w-full rounded-lg border border-[var(--border-color)] bg-[var(--background)] px-3 py-3">
          {options.map((item) => (
            <li
              key={item.value}
              onClick={() => {
                onChange(item.value);
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
