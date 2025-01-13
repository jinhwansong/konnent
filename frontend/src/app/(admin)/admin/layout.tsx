import React from 'react';
import { RQProvider } from '@/hooks';
import Header from './components/Header';
import Nav from './components/Nav';
import style from './layout.module.scss'
import ToastPopup from '@/app/_component/ToastPopup';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style.mainwrapper}>
      <Nav />
      <section>
        <RQProvider>
          <Header />

          <article>{children}</article>
        </RQProvider>
        <ToastPopup />
      </section>
    </div>
  );
}
