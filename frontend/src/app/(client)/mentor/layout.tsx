import React from "react";
import style from "./layout.module.scss";

export default function layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <section className={style.nonepadding}>
      {children}
      {modal}
    </section>
  );
}
