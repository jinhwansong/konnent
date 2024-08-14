import React from "react";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import { RQProvider } from '@/hooks';
import Header from './_component/Header';
import Footer from './_component/Footer';
import style from "./main.module.scss";


export default function layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  
  return (
    <RQProvider>
      <Header />
      <section className={style.main}>
        {children}
        {modal}
      </section>
      <Footer />
    </RQProvider>
  );
}
