import { CheckboxGroupProps } from '@/types/apply';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function CheckboxGroup({
  name,
  options,
  rules,
  type,
  className,
}: CheckboxGroupProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className={className}>
          {options.map((item) => {
            const isChecked =
              type === 'radio'
                ? field.value === item.value
                : Array.isArray(field.value) &&
                  field.value.includes(item.value);
            return (
              <label
                key={item.value}
                htmlFor={item.value}
                className={`h-10 cursor-pointer rounded-lg border px-3 text-sm leading-10 ${isChecked ? 'border-[var(--primary)] bg-[var(--primary)] text-white' : 'border-[var(--primary-sub02)] bg-[var(--primary-sub02)]'} hover:border-[var(--primary)] hover:bg-[var(--primary-sub02)] hover:text-[var(--primary)]`}
              >
                <input
                  id={item.value}
                  type={type}
                  hidden
                  value={item.value}
                  checked={isChecked}
                  onChange={(e) => {
                    const checked = e.target.checked;

                    if (type === 'radio') {
                      field.onChange(item.value);
                    } else {
                      const newValue = checked
                        ? [...(field.value ?? []), item.value]
                        : field.value.filter((v: string) => v !== item.value);
                      field.onChange(newValue);
                    }
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
