import { RegisterOptions } from 'react-hook-form';

export interface ApplyRequest {
  company: string;
  introduce: string;
  position: string;
  career: string;
  expertise: string[];
  portfolio: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface CheckboxGroupProps {
  name: string;
  options: Option[];
  rules?: RegisterOptions;
}
