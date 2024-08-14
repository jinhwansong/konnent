import React from "react";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Term from '../_component/Term';
import style from "./terms.module.scss";

export default async function page() {
  const session = await auth();
  if (session?.user) {
    redirect('/');
  }
  return (
    <section className={style.section}>
      <Term />
    </section>
  );
}
