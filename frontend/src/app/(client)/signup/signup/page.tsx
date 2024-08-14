import React from "react";
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Signup from '../_component/Signup';
import style from "./signup.module.scss";

export default async function page() {
  const session = await auth();
  if (session?.user){
    redirect('/');
  }
    return (
      <article className={style.article}>
        <h4>
          거이 다왔어요! <br /> <span>회원정보</span>를 입력해주세요
        </h4>
        <Signup />
      </article>
    );
}
