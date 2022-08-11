import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { themesList } from '@/config/common';
import useUser from '@/lib/useUser';

export default function Header() {
  const { user } = useUser();
  const [theme, setTheme] = useState('七夕');

  const changeTheme = (theme: string) => {
    const toggleEl = document.querySelector('[data-theme]');
    if (toggleEl) {
      toggleEl.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme) {
      changeTheme(theme);
      let name;
      themesList.forEach((value) => {
        if (value.theme === theme) {
          name = value.name;
        }
      });
      setTheme(name as unknown as string);
    }
  }, []);

  return (
    <div className='sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content backdrop-blur transition-all duration-100'>
      <nav className='navbar w-full shadow'>
        <div className='flex flex-1 md:gap-1 lg:gap-2'>
          <span
            className='tooltip tooltip-bottom before:text-xs before:content-[attr(data-tip)]'
            data-tip='Menu'
          >
            <label
              htmlFor='drawer'
              className='btn btn-square drawer-button btn-ghost lg:hidden'
            >
              <svg
                width='20'
                height='20'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                className='inline-block h-5 w-5 stroke-current md:h-6 md:w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16M4 18h16'
                ></path>
              </svg>
            </label>
          </span>
          <div className='flex items-center gap-2 lg:hidden'>
            <div className='flex-0 btn btn-ghost px-2'>
              <div className='font-title inline-flex text-lg text-primary transition-all duration-200 md:text-3xl'>
                <Link href='/'>
                  <span className='uppercase text-primary'>itpsp</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-0'>
          <div className='dropdown'>
            <label tabIndex={0} className='btn m-1 cursor-pointer p-1 text-xs'>
              主题:{theme}
            </label>
            <ul
              tabIndex={0}
              className='dropdown-content rounded-box grid w-60 -translate-x-28 grid-cols-3 gap-2 bg-base-100 p-2 shadow'
            >
              {themesList.map(({ name, theme }) => (
                <li
                  data-theme={theme}
                  key={theme}
                  onClick={() => {
                    changeTheme(theme);
                    let name;
                    themesList.forEach((value) => {
                      if (value.theme === theme) {
                        name = value.name;
                      }
                    });
                    setTheme(name as unknown as string);
                  }}
                  className='btn w-16 cursor-pointer bg-base-100 text-xs text-primary'
                >
                  <a>{name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {user && (
          <>
            <div className='avatar w-16'>
              <div className='mask mask-hexagon mr-4 h-12 w-12 rounded-full'>
                <img src={user.avatar_url} alt='' />
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}
