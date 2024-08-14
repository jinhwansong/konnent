'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';
import { useCheckboxStore } from '@/store/useCheck';
import Button from '@/app/_component/Button';
import Input from '@/app/_component/Input';
import Social from '@/app/(client)/_component/Social';

import { useVaild } from '@/hooks';
import {
  onEmail,
  onPassword,
  onPasswordCheack,
  onName,
  onPhone,
} from '@/hooks/useSign';
import {onSubmit} from '@/app/_lib/signup';
import style from './signup.module.scss';

export default function Signup() {
  const router = useRouter();
  const { checks } = useCheckboxStore();
  useEffect(() => {
    if (checks) {
      router.replace('/signup/terms');
    }
  }, [checks, router]);
  const [email, changeEmail, emailError] = useVaild('', onEmail);
  const [password, changePassword, passwordError] = useVaild('', onPassword);
  const [passwordCheack, changePasswordCheack, passwordCheackError] = useVaild(
    '',
    (value) => onPasswordCheack(password, value)
  );
  const [name, changeName, nameError] = useVaild('', onName);
  const [nickname, changeNickname, nicknameError] = useVaild('', onName);
  const [phone, changePhone, phoneError] = useVaild('', onPhone);
  // 데이터 보내기
  const [state, formAction] = useFormState(onSubmit, { message: null });
  const sign = [
    {
      type: 'text',
      value: email,
      onChange: changeEmail,
      label: '이메일',
      name: 'email',
      placeholder: 'example@konnect.com',
      error: emailError,
    },
    {
      type: 'password',
      value: password,
      onChange: changePassword,
      label: '비밀번호',
      name: 'password',
      placeholder: '8자이상 영문 숫자 특수문자 포함',
      error: passwordError,
    },
    {
      type: 'password',
      value: passwordCheack,
      onChange: changePasswordCheack,
      label: '비밀번호 확인',
      name: 'passwordCheack',
      placeholder: '8자이상 영문 숫자 특수문자 포함',
      error: passwordCheackError,
    },
    {
      type: 'text',
      value: name,
      onChange: changeName,
      label: '이름',
      name: 'name',
      placeholder: '지젤',
      error: nameError,
    },
    {
      type: 'text',
      value: nickname,
      onChange: changeNickname,
      label: '닉네임',
      name: 'nickname',
      placeholder: '지젤',
      error: nicknameError,
    },
    {
      type: 'tel',
      value: phone,
      onChange: changePhone,
      label: '휴대폰번호',
      name: 'phone',
      placeholder: '-없이 숫자만 입력',
      error: phoneError,
    },
  ];
  return (
    <>
      <form className={style.form} action={formAction}>
        {sign.map((signs, i) => (
          <div className={style.signfield} key={i}>
            <label>{signs.label}</label>
            <div>
              <Input
                type={signs.type}
                value={signs.value}
                onChange={signs.onChange}
                name={signs.name}
                placeholder={signs.placeholder}
                maxLength={signs.name === 'phone' ? 11 : 100}
                flex="on"
              />
              {(signs.name === 'email' || signs.name === 'nickname') && (
                <Button type="button" width="80">
                  중복확인
                </Button>
              )}
            </div>
            <p>{signs.error}</p>
          </div>
        ))}

        <Button
          type="submit"
          disabled={
            email.length === 0 ||
            password.length === 0 ||
            passwordCheack.length === 0 ||
            name.length === 0 ||
            nickname.length === 0 ||
            phone.length === 0 ||
            emailError !== '' ||
            passwordError !== '' ||
            passwordCheackError !== '' ||
            nameError !== '' ||
            nicknameError !== '' ||
            phoneError !== ''
          }
        >
          회원가입
        </Button>
      </form>
      <Social text="회원가입" />
    </>
  );
}
