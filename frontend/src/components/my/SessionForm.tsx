import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import Editor from '@/components/common/Editor';
import { uploadSessionImage } from '@/libs/upload';
import { useToastStore } from '@/stores/useToast';
import { SessionRequest } from '@/types/session';
import { EXPERTISE_OPTIONS } from '@/contact/apply';

interface SessionFormProps {
  onSubmit: (data: SessionRequest) => void;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  defaultValues?: SessionRequest;
  title: string;
}

export default function SessionForm({
  onSubmit,
  content,
  setContent,
  defaultValues,
  title,
}: SessionFormProps) {
  const { showToast } = useToastStore();
  const methods = useForm<SessionRequest>({
    mode: 'all',
    defaultValues: defaultValues ?? {
      title: '',
      description: '',
      price: 0,
      duration: 0,
      category: '',
    },
  });
  const {
    formState: { isValid },
  } = methods;
  const handleImageUpload = async (files: File[]) => {
    const formData = new FormData();
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/gif',
      'image/webp',
      'image/avif',
    ];

    files.forEach((file) => {
      if (file.name.length > 30) {
        showToast('파일명은 글자수 30자 미만으로 적어주세요.', 'error');
        return [];
      }

      if (file.size > 5 * 1024 * 1024) {
        showToast('파일 크기는 5MB 미만으로 줄여주세요.', 'error');
        return [];
      }

      if (!allowedTypes.includes(file.type)) {
        showToast('지원하지 않는 이미지 형식입니다.', 'error');
        return [];
      }
      formData.append('images', file);
    });
    formData.append('optimize', 'true');
    formData.append('maxWidth', '800');
    formData.append('quality', '80');
    try {
      const res = await uploadSessionImage(formData);
      return res.urls;
    } catch {
      showToast('이미지 업로드에 실패했습니다.', 'error');
      return [];
    }
  };
  return (
    <section className="flex-1">
      <h4 className="mb-5 text-xl leading-[1.4] font-semibold tracking-[-0.3px] text-[var(--text-bold)]">
        {title}
      </h4>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          className="flex w-full flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--text-bold)]">세션 제목</label>
            <Input
              name="title"
              type="text"
              placeholder="예: React 기초 강의"
              rules={{ required: '제목은 필수 입력입니다.' }}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex w-1/2 flex-col gap-1">
              <label className="text-sm text-[var(--text-bold)]">
                가격 (원)
              </label>
              <Input
                type="number"
                placeholder="예: 50000"
                {...methods.register('price', {
                  valueAsNumber: true,
                  required: '가격을 입력해주세요.',
                  min: {
                    value: 1000,
                    message: '최소 1000원 이상이어야 합니다.',
                  },
                })}
              />
            </div>

            <div className="flex w-1/2 flex-col gap-1">
              <label className="text-sm text-[var(--text-bold)]">
                시간 (분)
              </label>
              <Input
                type="number"
                placeholder="예: 60"
                {...methods.register('duration', {
                  valueAsNumber: true,
                  required: '시간을 입력해주세요.',
                  min: {
                    value: 10,
                    message: '최소 10분 이상이어야 합니다.',
                  },
                })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--text-bold)]">카테고리</label>
            <Select
              name="category"
              options={EXPERTISE_OPTIONS}
              placeholder="카테고리를 선택해주세요"
              rules={{ required: '카테고리를 선택해주세요.' }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-[var(--text-bold)]">설명</label>
            <Editor
              value={content}
              onChange={setContent}
              onImageUpload={handleImageUpload}
            />
          </div>
          <Button type="submit" disabled={!isValid}>
            {title}
          </Button>
        </form>
      </FormProvider>
    </section>
  );
}
