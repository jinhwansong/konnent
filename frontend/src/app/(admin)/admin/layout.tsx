import React from 'react';
import { RQProvider } from '@/hooks';
import Header from './components/Header';
import Nav from './components/Nav';
import style from './layout.module.scss'

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
      </section>
    </div>
  );
}
