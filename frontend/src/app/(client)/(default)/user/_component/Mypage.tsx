'use client';
import React, { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';
import { useUserData } from '@/app/_lib/useUser';
import {
  useUpdateNickname,
  useUpdatePassword,
  useUpdatePhone,
  useUpdateProfile,
} from '@/app/_lib/useUserMutation';
import InfoItem from './InfoItem';
import { useVaild } from '@/hooks';
import {
  onName,
  onPassword,
  onPasswordcheck,
  onPhone,
} from '@/hooks/useSign';
import { useToastStore } from '@/store/useToastStore';
import { IcProfile } from '@/asset';
import style from './mypage.module.scss';

export default function Mypage() {
  // 캐시 무효화
  const queryClient = useQueryClient();
  // 내정보
  const { data } = useUserData();
  // 새로운 비밀번호
  const [newPassword, changeNewPassword, newPasswordError] = useVaild(
    '',
    onPassword
  );
  // 현재 비밀번호
  const [currentPassword, changeCurrentPassword, currentPasswordError] =
    useVaild('', onPassword);
  const [passwordcheck, changePasswordcheck, passwordcheckError] = useVaild(
    '',
    (value) => onPasswordcheck(newPassword, value)
  );
  // 닉네임
  const [nickname, changeNickname, nicknameError] = useVaild(
    data?.nickname,
    onName
  );
  // 전화번호
  const [phone, changePhone, phoneError] = useVaild(data?.phone, onPhone);
  // toast팝업
  const showToast = useToastStore((state) => state.showToast);
  // 버튼
  const [prevKey, setPrevKey] = useState<string | null>('');
  const onButton = useCallback((name: string) => {
    setPrevKey((prev) => (prev === name ? null : name));
  }, []);
  // 이미지 변경
  const updateProfileMutation = useUpdateProfile();
  // 닉네임 변경
  const updateNicknameMutation = useUpdateNickname();
  // 비밀번호 변경
  const updatePasswordMutation = useUpdatePassword();
  // 휴대폰번호 변경
  const updatePhoneMutation = useUpdatePhone();

  // 취소
  const onCancel = useCallback(() => {
    const changeEvent = (value: string) =>
      ({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
    changeNickname(changeEvent(data?.nickname));
    changeCurrentPassword(changeEvent(''));
    changePasswordcheck(changeEvent(''));
    changePhone(changeEvent(data?.phone));
    showToast('변경이 취소되었습니다.', 'error');
    setPrevKey(null);
  }, [
    showToast,
    changeNickname,
    changeCurrentPassword,
    changePasswordcheck,
    changePhone,
    data?.nickname,
    data?.phone,
  ]);
  // 변경
  const onSave = useCallback(
    (name: string) => {
      if (name === '휴대폰 번호') {
        updatePhoneMutation.mutate(phone, {
          onSuccess: (data) => {
            showToast(data.message, 'success');
            setPrevKey(null);
          },
          onError: (err: unknown) => {
            if (typeof err === 'object' || err !== null)
              showToast((err as any).data, 'error');
          },
        });
      } else if (name === '닉네임') {
        updateNicknameMutation.mutate(nickname, {
          onSuccess: (data) => {
            showToast(data.message, 'success');
            setPrevKey(null);
          },
          onError: (err: unknown) => {
            if (typeof err === 'object' || err !== null)
              showToast((err as any).data, 'error');
          },
        });
      } else if (name === '비밀번호') {
        updatePasswordMutation.mutate(
          { newPassword, currentPassword },
          {
            onSuccess: (data) => {
              showToast(data.message, 'success');
              setPrevKey(null);
            },
            onError: (err: unknown) => {
              if (typeof err === 'object' || err !== null)
                showToast((err as any).data, 'error');
            },
          }
        );
      }
    },
    [
      updatePhoneMutation,
      updatePasswordMutation,
      updateNicknameMutation,
      nickname,
      phone,
      showToast,
      currentPassword,
      newPassword,
    ]
  );
  // 이미지
  const profileRef = useRef<HTMLInputElement>(null);
  const onProfile = useCallback(() => {
    profileRef.current?.click();
  }, []);
  const changeProfile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (file.name.length > 30) {
          return showToast('파일명은 글자수 30미만으로 적어주세요.', 'error');
        }
        if (file.size > 2 * 1024 * 1024) {
          return showToast('파일크기는 2mb 미만으로 줄여주세요.', 'error');
        }
        if (!file.type.startsWith('image/')) {
          return showToast('이미지 파일만 업로드 가능합니다.', 'error');
        }
        const image = new FormData();
        image.append('image', file);
        updateProfileMutation.mutate(image, {
          onSuccess: (data) => {
            showToast(data.message, 'success');
            queryClient.invalidateQueries();
          },
          onError: (err: unknown) => {
            if (typeof err === 'object' || err !== null)
              showToast((err as any).data, 'error');
          },
        });
      }
    },
    [showToast, updateProfileMutation, queryClient]
  );
  // 기본정보
  const profileInfo = React.useMemo(
    () => ({
      name: {
        label: '이름',
        data: data?.name,
      },
      nickname: {
        label: '닉네임',
        data: nickname,
        onButton: () => onButton('닉네임'),
        onSave: () => onSave('닉네임'),
        type: 'text',
        onChange: changeNickname,
        placeholder: '변경하실 닉네임을 적어주세요.',
        error: nicknameError,
      },
    }),
    [nickname, data?.name, changeNickname, nicknameError, onButton, onSave]
  );
  const basicInfo = React.useMemo(
    () => ({
      email: {
        label: '이메일',
        data: data?.email || data?.snsId,
      },
      password: {
        label: '비밀번호',
        data: currentPassword,
        snsid: data?.snsId,
        onButton: () => onButton('비밀번호'),
        onSave: () => onSave('비밀번호'),
        type: 'password',
        onChange: changeCurrentPassword,
        name: '비밀번호를 설정해주세요.',
        placeholder: '현재 비밀번호를 입력해주세요.',
        error: currentPasswordError,
        checkPassword: {
          label: '비밀번호 확인',
          data: passwordcheck,
          onChange: changePasswordcheck,
          placeholder: '비밀번호를 다시 입력해주세요.',
          error: passwordcheckError,
        },
        newPassword: {
          label: '새 비밀번호',
          data: newPassword,
          onChange: changeNewPassword,
          placeholder: '새 비밀번호를 입력해주세요.',
          error: newPasswordError,
        },
      },
      phone: {
        label: '휴대폰 번호',
        data: phone,
        onButton: () => onButton('휴대폰 번호'),
        onSave: () => onSave('휴대폰 번호'),
        type: 'number',
        onChange: changePhone,
        placeholder: '-없이 숫자만 입력',
        error: phoneError,
      },
    }),
    [
      data?.email,
      data?.snsId,
      onSave,
      onButton,
      phone,
      changePhone,
      phoneError,
      passwordcheck,
      passwordcheckError,
      changePasswordcheck,
      currentPassword,
      changeCurrentPassword,
      currentPasswordError,
      newPassword,
      changeNewPassword,
      newPasswordError,
    ]
  );
  return (
    <section className={style.mypage_section}>
      <article className={style.mypage_aticle}>
        <h4 className={style.mypage_title}>내 프로필</h4>
        <div className={style.info_item}>
          <em className={style.item_title}>이미지</em>
          <button onClick={onProfile} className={style.img_button}>
            <Image
              src={data?.image || IcProfile}
              alt={data?.name as string}
              height={100}
              width={100}
            />
            <input
              type="file"
              id="profile"
              name="profile"
              hidden
              ref={profileRef}
              onChange={changeProfile}
            />
          </button>
        </div>

        <InfoItem {...profileInfo.name} />
        <InfoItem
          {...profileInfo.nickname}
          prevKey={prevKey}
          onCancel={onCancel}
        />
      </article>
      <article className={style.mypage_aticle}>
        <h4 className={style.mypage_title}>기본 정보</h4>
        <InfoItem {...basicInfo.email} />
        <InfoItem
          {...basicInfo.password}
          prevKey={prevKey}
          onCancel={onCancel}
        />
        <InfoItem {...basicInfo.phone} prevKey={prevKey} onCancel={onCancel} />
      </article>
    </section>
  );
}
