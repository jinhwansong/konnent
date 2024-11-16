import React from "react";
import Term from '../_component/Term';
import style from "./terms.module.scss";

export default async function page() {
  
  return (
    <section className={style.section}>
      <Term />
    </section>
  );
}
