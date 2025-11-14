'use client';

import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getMessaging,
  getToken,
  onMessage,
  Messaging,
} from 'firebase/messaging';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';

import { fcm } from '@/libs/notification';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// 앱 중복 초기화 방지
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export function useFirebase(userId?: string) {
  const { data: session } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [messaging, setMessaging] = useState<Messaging | null>(null);

  // messaging 초기화는 클라이언트에서만
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;

    try {
      const m = getMessaging(app);
      setMessaging(m);

      // foreground 메시지 처리
      const unsubscribe = onMessage(m, payload => {
        if (Notification.permission === 'granted') {
          const noti = new Notification(
            payload.notification?.title || 'Konnect 알림',
            {
              body: payload.notification?.body,
              icon: '/icon.png',
              data: payload.data, // ← 중요
            }
          );

          // 클릭 시 링크 열기
          noti.onclick = () => {
            const link = noti.data?.link || '/';
            window.open(link, '_blank');
          };
        }
      });
      return () => unsubscribe();
    } catch (err) {
      console.error('🚨 Failed to init messaging:', err);
    }
  }, []);

  // 토큰 요청
  // 👉 실제 토큰을 가져오고 서버에 등록하는 공통 함수
  const fetchAndRegisterToken = useCallback(
    async (m: Messaging) => {
      if (!userId) return;

      const currentToken = await getToken(m, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      });

      if (currentToken && currentToken !== session?.user?.fcm) {
        setToken(currentToken);
        await fcm(currentToken); // 서버에 등록
      }
    },
    [userId, session?.user?.fcm]
  );

  // 👉 1) 로그인 할 때, 이미 권한이 허용된 상태라면 자동으로 토큰 등록
  useEffect(() => {
    if (!messaging) return;
    if (!userId) return;
    if (typeof window === 'undefined') return;

    if (Notification.permission === 'granted') {
      // 알림 허용 팝업은 안 뜨고, 바로 토큰만 받아서 서버에 매핑
      fetchAndRegisterToken(messaging).catch(err =>
        console.error('🚨 auto FCM token fetch failed:', err)
      );
    }
  }, [messaging, userId, fetchAndRegisterToken]);

  // 👉 2) 유저가 “알림 허용” 버튼을 눌렀을 때 호출할 함수
  const requestToken = useCallback(async () => {
    if (!messaging) return;
    if (!userId) return;

    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      await fetchAndRegisterToken(messaging);
    }
  }, [messaging, userId, fetchAndRegisterToken]);
  return { token, requestToken };
}
