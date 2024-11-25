'use client';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import Input from '@/app/_component/Input';
import { useInput } from '@/hooks';
import style from './header.module.scss';
export default function Header() {
  const [search, changeSearch] = useInput('');
  return (
    <header className={style.header}>
      <form className={style.header_search}>
        <Input
          type="text"
          value={search}
          onChange={changeSearch}
          placeholder="검색해보세요"
          name="search"
          bg="search"
        />
        <label htmlFor="search">
          <BiSearch />
        </label>
      </form>
      <div>
        
      </div>
    </header>
  );
}
