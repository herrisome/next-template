import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';

import Aside from '@/components/layout/Aside';
import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const loginStatus =
      localStorage.getItem('loginFlag') ||
      JSON.stringify({ status: false, time: null });
    if (!JSON.parse(loginStatus).status) {
      router.push('/');
    }
  }, []);

  return (
    <div data-theme='valentine' className='drawer drawer-mobile bg-base-100'>
      <input id='drawer' type='checkbox' className='drawer-toggle' />
      <div
        className='drawer-content bg-base-200/50'
        style={{ scrollBehavior: 'smooth', scrollPaddingTop: '5rem' }}
      >
        <Header />
        <div className='p-2 pb-16 md:p-4'>{children}</div>
      </div>
      <Aside />
    </div>
  );
}

export const getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
