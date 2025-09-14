import React from 'react';
import FormErrorMessage from './FormErrorMessage';

interface FormFieldWrapperProps {
  label: string;
  name: string;
  children: React.ReactNode;
  error?: string;
}

export default function FormFieldWrapper({
  label,
  name,
  children,
  error,
}: FormFieldWrapperProps) {
  return (
    <div className="relative flex flex-col gap-2" key={name}>
      <label htmlFor={name} className="text-sm text-[var(--text-bold)]">
        {label}
      </label>
      {children}
      <FormErrorMessage message={error} />
    </div>
  );
}
