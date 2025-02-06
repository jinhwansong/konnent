import React from "react";
import style from '@/styles/_common.module.scss';

interface ILayout {
  children: React.ReactNode;
}

export default function layout({ children }: ILayout) {
  return (
    <main className={style.container}>
      {children}
    </main>
  );
}
