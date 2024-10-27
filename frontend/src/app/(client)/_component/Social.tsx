import React, { useCallback } from 'react'
import { IcGoogle, IcKakao, IcNaver } from "@/asset";
import styles from './social.module.scss'
import { useRouter } from 'next/navigation';


interface ISocial {
  text: string;
}

export default function Social({ text }: ISocial) {
  const router = useRouter();
  const onSocial = useCallback(
    (sns: string) => {
      if (sns === 'kakao') {
        router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/kakao`);
      }
      if (sns === 'naver') {
        router.push(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/naver`);
      }
      if (sns === 'google') {
        router.push(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/auth/google`
        );
      }
    },
    [router]
  );
  return (
    <div className={styles.social}>
      <hr />
      <span>간편{text}</span>
      <div className={styles.social_btn}>
        <button
          type="button"
          onClick={() => onSocial('kakao')}
          className={styles.social_kakao}
        >
          <IcKakao />
          카카오로 {text}
        </button>
        <button
          type="button"
          className={styles.social_naver}
          onClick={() => onSocial('naver')}
        >
          <IcNaver />
          네이버로 {text}
        </button>
        <button
          type="button"
          className={styles.social_google}
          onClick={() => onSocial('google')}
        >
          <IcGoogle />
          구글로 {text}
        </button>
      </div>
    </div>
  );
}
