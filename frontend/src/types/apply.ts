import { RegisterOptions } from 'react-hook-form';

export interface ApplyRequest {
  company: string;
  introduce: string;
  position: string;
  career: string;
  expertise: string[];
  portfolio: string;
}

export interface Option<T extends string = string> {
  label: string;
  value: T;
}

export interface CheckboxGroupProps {
  name: string;
  options: Option[];
  rules?: RegisterOptions;
}
