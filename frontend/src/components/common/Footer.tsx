import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const services = [
    { id: 1, title: '멘토 지원하기', link: '/mentor' },
    { id: 2, title: '분야별 멘토 찾기', link: '/mentors' },
    { id: 3, title: '아티클', link: '/article' },
  ];
  const socials = [
    {
      id: 1,
      title: '개인 블로그',
      link: 'https://song7022556.tistory.com',
    },
    {
      id: 2,
      title: '깃허브',
      link: 'https://github.com/jinhwansong?tab=repositories',
    },
  ];
  const terms = [
    {
      id: 1,
      title: '이용약관',
      link: '/term',
    },
    {
      id: 2,
      title: '개인정보처리방침',
      link: '/privacy',
    },
  ];
  return (
    <footer className="border-t border-[var(--border-color)]">
      <div className="mx-auto flex max-w-[1200px] justify-between gap-[100px] py-10">
        <div className="flex-[1.3] border-r border-[var(--border-color)] pr-6">
          <p className="text-sm [&>span]:mt-[5px] [&>span]:inline-block [&>span]:align-middle">
            <span>커넥트</span>
            <LineDivider />
            <span>대표 플러팅</span>
            <LineDivider /> <span>사업자등록번호: 123-45-67890</span>
            <br />
            <span>
              운영시간: 10:00~19:00(점심시간 12:00~13:00, 주말 및 공휴일 휴무)
            </span>
            <br />
            <span>주소: 경기도 고양시 일산서구 덕산로 3080</span>
            <LineDivider />
            <span>대표번호: 010-1234-5678</span>
            <br />
            <span>호스팅서비스 제공자 : Vercel</span>
          </p>
          <em className="mt-4 block text-sm text-[var(--text-subtle)]">
            © 2024 커넥팅, Inc. All rights reserved.
          </em>
        </div>
        <ul className="flex flex-[1] justify-between">
          <li className="flex flex-col gap-4">
            <em className="text-sm font-bold">이용약관</em>
            {terms.map((service) => (
              <Link
                key={service.id}
                href={service.link}
                className="block text-sm font-medium"
              >
                {service.title}
              </Link>
            ))}
          </li>
          <li className="flex flex-col gap-4">
            <em className="text-sm font-bold">서비스</em>
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.link}
                className="block text-sm font-medium"
              >
                {service.title}
              </Link>
            ))}
          </li>
          <li className="flex flex-col gap-4">
            <em className="text-sm font-bold">소셜</em>
            {socials.map((service) => (
              <Link
                key={service.id}
                href={service.link}
                target="_blank"
                className="block text-sm font-medium"
              >
                {service.title}
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </footer>
  );
}

function LineDivider() {
  return (
    <span className="mx-[10px] inline-block h-2 w-px bg-[var(--primary-sub02)]" />
  );
}
