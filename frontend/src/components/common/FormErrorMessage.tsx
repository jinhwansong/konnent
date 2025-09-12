import React from 'react';

interface FormErrorMessageProps {
  message?: string;
  className?: string;
}

export default function FormErrorMessage({
  message,
  className,
}: FormErrorMessageProps) {
  if (!message) return null;
  return <p className={`text-sm text-red-500 ${className}`}>{message}</p>;
}
