'use client'
import React, { useCallback, useState } from 'react'
import Link from 'next/link';
import Button from '@/app/_component/Button';
import Input from '@/app/_component/Input';
import Social from '@/app/(client)/_component/Social';
import styles from './login.module.scss';
import { useInput } from '@/hooks';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
export default function Login() {
  const [email, changeEmail] = useInput("")
  const [password, changePassword] = useInput('');
  const [message, setMessage] = useState('');
  const input = [
    {
      type: 'text',
      name: 'email',
      value: email,
      onChange: changeEmail,
      placeholder: '이메일',
    },
    {
      type: 'password',
      name: 'password',
      value: password,
      onChange: changePassword,
      placeholder: '비밀번호',
    },
  ];
  const router = useRouter();
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await signIn('credentials', {
          username: email,
          password,
          redirect: false,
        });
        router.replace('/');
      } catch (error) {
        setMessage('아이디 또는 비밀번호가 틀립니다.')
      }
    },
    [email, password, router]
  );
  return (
    <>
      <h4 className={styles.title}>커넥트 시작하기</h4>
      <form onSubmit={onSubmit} className={styles.form}>
        {input.map((inputs, i) => (
          <Input
            type={inputs.type}
            placeholder={inputs.placeholder}
            name={inputs.name}
            onChange={inputs.onChange}
            value={inputs.value}
            key={i}
          />
        ))}
        <Link href="/password">비밀번호를 잊으셨나요?</Link>
        <Button type="submit">로그인</Button>
      </form>
      <Link href="/signup/terms" className={styles.signup}>
        <span>회원이 아니신가요?</span> 회원가입
      </Link>
      <Social text="로그인" />
    </>
  );
}
