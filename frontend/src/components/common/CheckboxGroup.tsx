import { CheckboxGroupProps } from '@/types/apply';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function CheckboxGroup({
  name,
  options,
  rules,
}: CheckboxGroupProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-wrap gap-2">
          {options.map((item) => {
            const isChecked = field.value.includes(item.value);
            return (
              <label
                key={item.value}
                htmlFor={item.value}
                className={`h-10 cursor-pointer rounded-lg border px-3 text-sm leading-10 ${isChecked ? 'border-[var(--primary)] text-[var(--primary)]' : 'border-[var(--border-color)]'} hover:text-[var(--primary)]`}
              >
                <input
                  id={item.value}
                  type="checkbox"
                  hidden
                  value={item.value}
                  checked={isChecked}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const newValue = checked
                      ? [...field.value, item.value]
                      : field.value.filter((v: string) => v !== item.value);
                    field.onChange(newValue);
                  }}
                />
                {item.label}
              </label>
            );
          })}

          {fieldState.error && (
            <span className="text-sm text-red-500">
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}
