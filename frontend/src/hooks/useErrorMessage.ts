import { useFormContext } from 'react-hook-form';

export default function useErrorMessage(name: string) {
  const {
    formState: { errors },
  } = useFormContext();
  return (errors[name]?.message ?? '') as string;
}
