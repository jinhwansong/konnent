'use client';
import React, { useCallback, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import useInput from '@/hooks/useInput';
import useNumber from '@/hooks/useNumber';
import Input from '@/app/_component/Input';
import Editor from '@/app/_component/Editor';
import { useCreateProgram, useModifyProgram } from '@/app/_lib/useProgram';
import { IErr, IModifyPrograms } from '@/type';
import { useToastStore } from '@/store/useToastStore';
import { useRouter } from 'next/navigation';
import Button from '@/app/_component/Button';
import style from './programForm.module.scss';

interface IProgramForm {
  mode: string;
  initialData?: IModifyPrograms;
}

export default function ProgramForm({ mode, initialData }: IProgramForm) {
  // 캐싱
  const queryClient = useQueryClient();
  // toast팝업
  const { showToast } = useToastStore((state) => state);
  const router = useRouter();
  const [title, onTitle] = useInput(initialData ? initialData?.title : '');
  const [prices, changePrice, price] = useNumber(
    initialData ? String(initialData?.price) : ''
  );
  const [durations, changeDuration, duration] = useNumber(
    initialData ? String(initialData?.duration) : ''
  );
  const [content, setContent] = useState(
    initialData ? String(initialData?.content) : ''
  );
  const onContent = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);
  const createProgram = useCreateProgram();
  const modifyProgram = useModifyProgram();
  const onProgram = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
    const mutationOptions = {
      onSuccess: (data: any) => {
        queryClient.invalidateQueries({
          queryKey: ['mentors'],
          exact: false,
        });
        router.back();
        showToast(data.message, 'success');
      },
      onError: (error: Error) => {
        const customError = error as IErr;
        showToast(customError.data, 'error');
      },
    };
    if(mode === 'edit') {
        createProgram.mutate({ title, price, duration, content }, mutationOptions);
    }
    if(mode === 'modify') {
        modifyProgram.mutate({ title, price, duration, content, id: initialData?.id as number }, mutationOptions);
    }
    },
    [
        initialData?.id,
      modifyProgram,
      mode,
      title,
      price,
      router,
      duration,
      content,
      createProgram,
      showToast,
      queryClient,
    ]
  );
  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <section className={style.add_section}>
      <h4 className={style.add_title}>멘토링 프로그램 {mode === 'edit' ? '등록' : '수정'}</h4>
      <form onSubmit={onProgram}>
        <article className={style.add_article}>
          <div>
            <label htmlFor="title">
              멘토링 명(한 줄 요약) <span>*</span>
            </label>
            <Input
              name="title"
              type="text"
              placeholder="예) 개발자 취업 / 면접 / 이직 / 커리어 멘토링"
              value={title}
              onChange={onTitle}
            />
          </div>
        </article>
        <article className={style.add_article}>
          <div>
            <label htmlFor="price">
              멘토링 1회당 가격 <span>*</span>
            </label>
            <Input
              name="price"
              type="text"
              placeholder="10000"
              value={prices}
              onChange={changePrice}
            />
          </div>
          <div>
            <label htmlFor="duration">
              멘토링 1회당 시간(분 단위) <span>*</span>
            </label>
            <Input
              name="duration"
              type="text"
              placeholder="60"
              value={durations}
              onChange={changeDuration}
            />
          </div>
        </article>
        <article className={style.add_article}>
          <div>
            <label htmlFor="content">
              멘토링 내용 <span>*</span>
            </label>
            <Editor onIntroduce={onContent} introduce={content} />
          </div>
        </article>
        <div className={style.button_wrap}>
          <Button type="button" onClick={handleCancel} bg="none" width="Small">
            취소
          </Button>
          <Button type="submit" width="Small">
            {mode === 'modify' ? '수정' : '등록'}
          </Button>
        </div>
      </form>
    </section>
  );
}
