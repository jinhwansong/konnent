import React from 'react'
import { useRouter } from 'next/navigation';
import { IcGoogle, IcKakao, IcNaver } from "@/asset";
import styles from './social.module.scss'

interface ISocial {
  text: string;
}

export default function Social({ text }: ISocial) {
  const router = useRouter();
  const onKakao = () => {
    router.push(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kakao`);
  };
  return (
    <div className={styles.social}>
      <hr />
      <span>간편{text}</span>
      <div className={styles.social_btn}>
        <button
          type="button"
          onClick={() => onKakao()}
          className={styles.social_kakao}
        >
          <IcKakao />
          카카오로 {text}
        </button>
        <button type="button" className={styles.social_naver}>
          <IcNaver />
          네이버로 {text}
        </button>
        <button type="button" className={styles.social_google}>
          <IcGoogle />
          구글로 {text}
        </button>
      </div>
    </div>
  );
}
