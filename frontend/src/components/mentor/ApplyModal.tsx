'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { CAREER_OPTIONS, POSITION_OPTIONS } from '@/contact/apply';
import { FormProvider, useForm } from 'react-hook-form';
import { ApplyRequest } from '@/types/apply';
import Input from '../common/Input';
import CheckboxGroup from '../common/CheckboxGroup';
import Textarea from '../common/Textarea';
import Button from '../common/Button';
import { useMentorApply } from '@/hooks/query/useMentorApply';
import { useToastStore } from '@/stores/useToast';
import Modal from '../common/Modal';
import { EXPERTISE_OPTIONS } from '@/contact/mentoring';
import { useSession } from 'next-auth/react';
import Select from '../common/Select';

export default function ApplyModal() {
  const router = useRouter();
  const { showToast } = useToastStore();
  const { data: session } = useSession();
  const { mutate: applyMentor } = useMentorApply();
  const methods = useForm<ApplyRequest>({
    mode: 'all',
    defaultValues: {
      company: '',
      introduce: '',
      position: '',
      career: '',
      expertise: [],
      portfolio: '',
    },
  });
  const {
    formState: { isValid },
  } = methods;
  const onSubmit = (data: ApplyRequest) => {
    applyMentor(data, {
      onSuccess: () => {
        showToast('멘토신청을 완료했습니다.', 'success');
        router.push('/');
      },
      onError: (error) => {
        const errorMessage =
          error instanceof Error ? error.message : '오류가 발생했습니다.';
        showToast(errorMessage, 'error');
      },
    });
  };
  const MENTOR_APPLY_FIELDS = [
    {
      type: 'input',
      name: 'company',
      label: '회사명',
      placeholder: '회사명을 입력해주세요.',
      rules: { required: '회사명은 필수 입력입니다.' },
    },
    {
      type: 'select',
      name: 'position',
      label: '직무',
      placeholder: '직무를 선택해주세요.',
      options: POSITION_OPTIONS,
      rules: { required: '직무를 선택해주세요.' },
    },
    {
      type: 'select',
      name: 'career',
      label: '연차',
      placeholder: '연차를 선택해주세요.',
      options: CAREER_OPTIONS,
      rules: { required: '연차를 선택해주세요.' },
    },
    {
      type: 'checkbox',
      name: 'expertise',
      label: '전문 분야',
      options: EXPERTISE_OPTIONS,
      rules: { required: '필수 입력입니다' },
    },
    {
      type: 'textarea',
      name: 'introduce',
      label: '자기소개',
      placeholder: '자기소개를 입력해주세요.',
      rules: { required: '자기소개는 필수 입력입니다.' },
    },
    {
      type: 'input',
      name: 'portfolio',
      label: '포트폴리오 링크',
      placeholder: 'URL 형식으로 입력해주세요.',
      rules: {
        pattern: {
          value: /^https?:\/\/.+/,
          message: '유효한 URL을 입력해주세요.',
        },
      },
    },
  ];
  return (
    <Modal link="/mentor">
      <h4 className="mb-5 text-xl leading-[1.4] font-semibold tracking-[-0.3px] text-[var(--text-bold)]">
        감사합니다,
        <span className="text-[var(--primary-sub01)]">
          {session?.user?.nickname}
        </span>
        님<br />
        지식공유자가 되기 위해서
        <br />
        아래 정보가 필요해요.
      </h4>
      <FormProvider {...methods}>
        <form
          noValidate
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-5"
        >
          {MENTOR_APPLY_FIELDS.map((item) => {
            switch (item.type) {
              case 'input':
                return (
                  <FormFieldWrapper
                    key={item.name}
                    label={item.label}
                    name={item.name}
                  >
                    <Input {...item} />
                  </FormFieldWrapper>
                );
              case 'select':
                return (
                  <FormFieldWrapper
                    key={item.name}
                    label={item.label}
                    name={item.name}
                  >
                    <Select {...item} options={item.options!} />
                  </FormFieldWrapper>
                );
              case 'textarea':
                return (
                  <FormFieldWrapper
                    key={item.name}
                    label={item.label}
                    name={item.name}
                  >
                    <Textarea {...item} maxLength={100} />
                  </FormFieldWrapper>
                );
              case 'checkbox':
                return (
                  <FormFieldWrapper
                    key={item.name}
                    label={item.label}
                    name={item.name}
                  >
                    <CheckboxGroup
                      {...item}
                      options={item.options!}
                      type="checkbox"
                      className="flex flex-wrap gap-2"
                    />
                  </FormFieldWrapper>
                );
              default:
                return null;
            }
          })}
          <Button type="submit" disabled={!isValid}>
            멘토지원
          </Button>
        </form>
      </FormProvider>
    </Modal>
  );
}

interface FormFieldWrapperProps {
  label: string;
  name: string;
  children: React.ReactNode;
}

function FormFieldWrapper({ label, name, children }: FormFieldWrapperProps) {
  return (
    <div className="relative flex flex-col gap-2" key={name}>
      <label htmlFor={name} className="text-sm text-[var(--text-bold)]">
        {label}
      </label>
      {children}
    </div>
  );
}
