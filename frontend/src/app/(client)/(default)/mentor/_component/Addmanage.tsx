'use client';
import React, { useCallback, useState } from 'react';
import useInput from '@/hooks/useInput';
import useNumber from '@/hooks/useNumber';
import Input from '@/app/_component/Input';
import Editor from '@/app/_component/Editor';
import style from './addmanage.module.scss';
import { useProgram } from '@/app/_lib/useProgram';
import { IErr } from '@/type';
import { useToastStore } from '@/store/useToastStore';
import { useRouter } from 'next/navigation';
import Button from '@/app/_component/Button';


export default function Addmanage() {
  // toast팝업
    const { showToast } = useToastStore((state) => state);
    const router = useRouter();
  const [title, onTitle] = useInput('');
  const [prices, changePrice, price] = useNumber('');
  const [durations, changeDuration, duration] = useNumber('');
  const [content, setContent] = useState('');
  const onContent = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);
  const program = useProgram()
  const onProgram = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      program.mutate(
        { title, price, duration, content },
        {
          onSuccess: (data) => {
            router.back();
            showToast(data.message, 'success');
          },
          onError: (error: Error) => {
            const customError = error as IErr;
            showToast(customError.data, 'error');
          },
        }
      );
    },
    [title, price, duration, content, program, showToast, router]
  );
  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <section className={style.add_section}>
      <h4 className={style.add_title}>멘토링 프로그램 등록</h4>
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
              멘토링 1회당 시간 <span>*</span>
            </label>
            <Input
              name="duration"
              type="text"
              placeholder="1"
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
            등록
          </Button>
        </div>
      </form>
    </section>
  );
}
