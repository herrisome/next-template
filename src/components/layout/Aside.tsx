import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { SiWebcomponentsdotorg } from 'react-icons/si';

import { common } from '@/config/common';

export default function Aside() {
  return (
    <div
      className='drawer-side'
      style={{ scrollBehavior: 'smooth', scrollPaddingTop: '5rem' }}
    >
      <label htmlFor='drawer' className='drawer-overlay' />
      <aside className='w-80 bg-base-100'>
        <div className='sticky top-0 z-20 hidden items-center gap-2 bg-base-100 bg-opacity-90 px-4 py-2 shadow backdrop-blur lg:flex'>
          <div className='flex-0 btn btn-ghost px-2'>
            <div className='font-title inline-flex text-lg text-primary transition-all duration-200 md:text-3xl'>
              <Link href='/'>
                <span className='uppercase text-primary'>itpsp</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='h-4' />
        <ul className='menu menu-compact flex flex-col p-0 px-4'>
          {common.map((e) => (
            <li key={e.url}>
              <MenuButton {...e} />
            </li>
          ))}
        </ul>
        <div className='pointer-events-none sticky bottom-0 flex h-20 bg-gradient-to-t from-base-100 to-transparent' />
      </aside>
    </div>
  );
}

function MenuButton({ url, name }: { url: string; name: string }) {
  const router = useRouter();
  const { asPath } = router;

  return (
    <Link href={url}>
      <a
        id='components'
        className={`flex gap-4 ${asPath.includes(url) && 'active'}`}
      >
        <span className='flex-none'>
          <SiWebcomponentsdotorg />
        </span>
        <span className='flex-1'>{name}</span>
      </a>
    </Link>
  );
}
