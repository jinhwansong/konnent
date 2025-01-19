'use client';
import React, { useCallback, useState } from 'react';
import {
  useMentorData,
  useUpdateCareer,
  useUpdateCompony,
  useUpdateIntroduce,
  useUpdateJob,
  useUpdateProfile,
} from '@/app/_lib/useMentor';
import ProfileSection from './ProfileSection';
import CareerItem from './CareerItem';
import InfoItem from './InfoItem';
import EditroItem from './EditroItem';
import { usePopupStore } from '@/store/usePopupStore';
import useProfileActions from '@/hooks/useProfileActions';
import useSelect from '@/hooks/useSelect';
import { onName } from '@/util/useSign';
import useVaild from '@/hooks/useVaild';
import { joblist, careerlist } from '@/app/(client)/config/job';
import style from './profile.module.scss';

export default function MentoProfile() {
  // 내정보
  const { data } = useMentorData();
  // 팝업관련...
  const { onPopup2, popup2 } = usePopupStore();
  const { onPopup3, popup3 } = usePopupStore();
  // 희망분야, 멘토 경력, 멘토 회사
  const [job, onJob] = useSelect(data?.job || '', onPopup2);
  const [career, onCareer] = useSelect(data?.career || '', onPopup3);
  const [compony, changeCompony, componyError] = useVaild(
    data?.company ?? '현재 다니시는 회사명을 적어주세요.',
    onName
  );
  const [introduce, setIntroduce] = useState(data?.introduce);
  const onIntroduce = useCallback((newContent: string) => {
    setIntroduce(newContent);
  }, []);
  // mutations
  const updateJob = useUpdateJob();
  const updateCompony = useUpdateCompony();
  const updateCareer = useUpdateCareer();
  const updateProfile = useUpdateProfile();
  const updateIntroduce = useUpdateIntroduce();
  const { prevKey, handleEdit, handleCancel, handleSave, handleCancelCareer } =
    useProfileActions();
  return (
    <section className={style.mypage_section}>
      <article className={style.mypage_aticle}>
        <h4 className={style.mypage_title}>멘토 프로필</h4>
        <ProfileSection
          mutation={updateProfile}
          image={data?.image}
          title="멘토 프로필"
        />
        <InfoItem
          label="회사명"
          data={compony}
          type="text"
          placeholder="회사명을 적어주세요."
          isEditing={prevKey === '회사명'}
          handleEdit={() => handleEdit('회사명')}
          handleSave={() => handleSave('회사명', compony, updateCompony)}
          handleCancel={() => handleCancel(changeCompony, data?.company)}
          error={componyError}
          onChange={changeCompony}
        />
        <EditroItem
          data={
            data?.introduce
              ? data?.introduce
              : '나만의 스킬, 깃허브 링크 등으로 소개글을 채워보세요.'
          }
          isEditing={prevKey === '자기소개'}
          handleEdit={() => handleEdit('자기소개')}
          handleSave={() => handleSave('자기소개', introduce, updateIntroduce)}
          handleCancel={() => handleCancelCareer(onIntroduce, data?.introduce)}
          onIntroduce={onIntroduce}
          introduce={introduce}
        />
      </article>
      <article className={style.mypage_aticle}>
        <h4 className={style.mypage_title}>경력과 멘토링 분야</h4>
        <CareerItem
          options={careerlist}
          onSelet={onCareer}
          popup={popup3}
          onPopup={onPopup3}
          label="멘토 경력"
          isEditing={prevKey === '멘토 경력'}
          handleEdit={() => handleEdit('멘토 경력')}
          handleSave={() => handleSave('멘토 경력', career, updateCareer)}
          handleCancel={() => handleCancelCareer(onCareer, data?.career)}
          data={data?.career}
          seletText={career}
        />
        <CareerItem
          options={joblist}
          onSelet={onJob}
          popup={popup2}
          onPopup={onPopup2}
          label="멘토링 희망분야"
          isEditing={prevKey === '멘토링 희망분야'}
          handleEdit={() => handleEdit('멘토링 희망분야')}
          handleSave={() => handleSave('멘토링 희망분야', job, updateJob)}
          handleCancel={() => handleCancelCareer(onJob, data?.job)}
          data={data?.job}
          seletText={job}
        />
      </article>
    </section>
  );
  // 자기소개 회사명
}
