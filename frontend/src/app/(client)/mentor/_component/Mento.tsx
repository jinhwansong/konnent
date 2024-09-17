'use client';
import React, { useState } from 'react';
import { usePopupStore } from '@/store/usePopupStore';
import { useInput, useNumber, useSelect } from '@/hooks';
import Input from '@/app/_component/Input';
import Selet from '@/app/_component/Selet';
import Editor from '@/app/_component/Editor';
import { joblist, careerlist } from '@/app/(client)/config/job';
import styles from './mento.module.scss';


export default function Mento() {
  //멘토링주제
  const [title, changeTitle] = useInput('');
  const [content, setContent] = useState('');
  // 멘토 현직
  const [office, changeOffice] = useInput('');
  // 멘토링 가격
  const [price, changePrice] = useNumber('');
  // 멘토 직무
  const { onPopup2, popup2 } = usePopupStore();
  const [job, onJob] = useSelect('', onPopup2);
  // 멘토 직무
  const { onPopup3, popup3 } = usePopupStore();
  const [career, onCareer] = useSelect('', onPopup3);
  return (
    <form className={styles.form}>
      <div>
        <label htmlFor="title" className={styles.title}>
          멘토링 주제 <span>*</span>
        </label>
        <Input
          type="text"
          placeholder="멘토링하고 싶은 주제를 적어주세요"
          name="title"
          value={title}
          onChange={changeTitle}
        />
      </div>
      <div>
        <label htmlFor="title" className={styles.title}>
          멘토 직무 <span>*</span>
        </label>
        <Selet
          list={joblist}
          open={popup2}
          onPopup={onPopup2}
          seletText={job}
          text="멘토님의 현재 직무를 골라주세요"
          onSelet={onJob}
        />
      </div>
      <div>
        <label htmlFor="title" className={styles.title}>
          멘토 현직 <span>*</span>
        </label>
        <Input
          type="text"
          placeholder="멘토님의 현직을 적어주세요"
          name="office"
          value={office}
          onChange={changeOffice}
        />
      </div>
      <div>
        <label htmlFor="title" className={styles.title}>
          멘토경력 <span>*</span>
        </label>
        <Selet
          list={careerlist}
          open={popup3}
          onPopup={onPopup3}
          seletText={career}
          text="멘토님의 현재 경력를 골라주세요"
          onSelet={onCareer}
          width="100"
        />
      </div>
      <div>
        <label htmlFor="title" className={styles.title}>
          1회 멘토링 가격 <span>*</span>
        </label>
        <Input
          type="text"
          placeholder="1회당 멘토링 가격을 적어주세요"
          name="price"
          value={price}
          onChange={changePrice}
        />
        <p className={styles.price}>원</p>
      </div>
      <div className={styles.editor}>
        <label className={styles.title}>
          멘토님 자기소개 <span>*</span>
        </label>
        <Editor setContent={setContent} content={content} />
      </div>
    </form>
  );
}
