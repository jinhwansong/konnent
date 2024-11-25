import React from 'react';
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
        <Header />
        <article>{children}</article>
      </section>
    </div>
  );
}
