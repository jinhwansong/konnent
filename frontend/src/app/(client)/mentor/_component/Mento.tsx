'use client';
import React, { FormEvent, useCallback } from 'react';
import { usePopupStore } from '@/store/usePopupStore';
import { useInput, useSelect } from '@/hooks';
import Input from '@/app/_component/Input';
import Selet from '@/app/_component/Selet';
import Button from '@/app/_component/Button';
import { joblist, careerlist } from '@/app/(client)/config/job';
import style from './mento.module.scss';
import { useUserData } from '@/app/_lib/useUserData';
import { useMento } from '@/app/_lib/check';

export default function Mento() {
  // 팝업관련...
  const { onPopup2, popup2 } = usePopupStore();
  const { onPopup3, popup3 } = usePopupStore();
  // 연락받을 이메일
  const [email, changeEmail] = useInput('');
  // 희망분야
  const [job, onJob] = useSelect('', onPopup2);
  // 자기소개
  const [introduce, changeIntroduce] = useInput('');
  // 링크
  const [portfolio, changePortfolio] = useInput('');
  // 멘토 경력
  const [career, onCareer] = useSelect('', onPopup3);
  const fieldValues = [
    {
      id: 'email',
      label: '연락받을 이메일 주소',
      type: 'input',
      placeholder: '자주사용하는 이메일을 입력해주세요',
      value: email,
      change: changeEmail,
    },
    {
      id: 'job',
      label: '멘토링 희망분야',
      type: 'select',
      options: joblist,
      placeholder: '희망하시는 멘토링 분야를 선택해주세요',
      value: job,
      onSelet: onJob,
      popup: popup2,
      onPopup: onPopup2,
    },
    ,
    {
      id: 'career',
      label: '멘토 경력',
      type: 'select',
      options: careerlist,
      placeholder: '현재 경력을 선택해주세요',
      value: career,
      onSelet: onCareer,
      popup: popup3,
      onPopup: onPopup3,
    },

    {
      id: 'introduce',
      label: '자기소개',
      type: 'textarea',
      placeholder: '멘토님을 소개해주세요',
      value: introduce,
      change: changeIntroduce,
    },
    {
      id: 'portfolio',
      label: '포트폴리오 링크',
      type: 'input',
      placeholder: '포트폴리오 링크를 입력해주세요',
      value: portfolio,
      change: changePortfolio,
    },
  ];
  // 버튼활성화
  const buttonDisabled = [email, job, introduce, portfolio, career].every(
    (l) => l.length > 0
  ); 
  // 내정보
  const { data } = useUserData();
  // 멘토등록
  const mentoMutation = useMento()
  const onMento = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mentoMutation.mutate(
        { email, job, introduce, portfolio, career },
        
      );
    },
    [mentoMutation, email, job, introduce, portfolio, career]
  );
  return (
    <>
      <h4 className={style.title}>
        감사합니다, {data.nickname} 님<br />
        지식공유자가 되기 위해서
        <br />
        아래 정보가 필요해요.
      </h4>
      <form className={style.form} onSubmit={onMento}>
        {fieldValues.map((value) => {
          return (
            <div key={value?.id}>
              <label htmlFor={value?.value} className={style.label}>
                {value?.label} <span>*</span>
              </label>
              {value?.type === 'input' && (
                <Input
                  type={value.type}
                  placeholder={value.placeholder}
                  name={value.id}
                  value={value.value}
                  onChange={value.change}
                />
              )}
              {value?.type === 'select' && (
                <Selet
                  list={value.options as string[]}
                  open={value.popup as boolean}
                  onPopup={value.onPopup as () => void}
                  seletText={value.value}
                  name={value.id}
                  text={value.placeholder}
                  onSelet={value.onSelet as (selet: string) => void}
                  width="100"
                />
              )}
              {value?.type === 'textarea' && (
                <textarea
                  placeholder={value.placeholder}
                  value={value.value}
                  onChange={value.change}
                  name={value.id}
                  className={style.textarea}
                  rows={5}
                />
              )}
            </div>
          );
        })}
        <Button type="submit" disabled={!buttonDisabled}>
          멘토지원
        </Button>
      </form>
    </>
  );
}
