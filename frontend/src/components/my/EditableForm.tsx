'use client';
import React, { useState } from 'react';
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../common/Input';
import FormErrorMessage from '../common/FormErrorMessage';
import Button from '../common/Button';

interface EditableFieldProps {
  label: string;
  name: string;
  defaultValue: string;
  rules: RegisterOptions;
  onSubmit: (value: string) => Promise<void> | void;
  type?: string;
  placeholder: string;
  isPhone?: boolean;
}

export default function EditableForm({
  label,
  name,
  defaultValue,
  rules,
  onSubmit,
  type = 'text',
  placeholder,
  isPhone,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    reset,

    formState: { isValid, errors },
  } = useForm<Record<string, string>>({
    mode: 'all',
    defaultValues: { [name]: defaultValue },
  });
  const submitHandler: SubmitHandler<Record<string, string>> = async (data) => {
    await onSubmit(data[name]);
    setIsEditing(false);
    reset({ [name]: data[name] });
  };
  const cancelHandler = () => {
    reset({ [name]: defaultValue });
    setIsEditing(false);
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
      <em className="block text-sm font-medium text-[var(--text)]">{label}</em>

      {!isEditing && (
        <div className="flex items-center gap-5">
          <Input type={type} placeholder={placeholder} disabled />
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-[45px]"
            onClick={() => setIsEditing(true)}
          >
            설정
          </Button>
        </div>
      )}

      {isEditing && (
        <>
          <Input
            type={isPhone ? 'text' : type}
            inputMode={isPhone ? 'numeric' : undefined}
            pattern={isPhone ? '\\d*' : undefined}
            maxLength={isPhone ? 11 : undefined}
            placeholder={placeholder}
            {...register(name, rules)}
            onInput={
              isPhone
                ? (e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      '',
                    );
                  }
                : undefined
            }
          />
          <FormErrorMessage message={errors[name]?.message as string} />

          <div className="flex justify-end gap-3">
            <Button type="submit" size="sm" variant="solid" disabled={!isValid}>
              저장
            </Button>
            <Button
              type="button"
              size="sm"
              variant="danger"
              onClick={cancelHandler}
            >
              취소
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
