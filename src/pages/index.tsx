import * as React from 'react';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import useUser from '@/lib/useUser';

export default function HomePage() {
  const { user } = useUser({
    redirectTo: '/',
    redirectIfFound: true,
  });

  return (
    <>
      <Seo templateTitle='首页' description='主页' />
      <main>
        <h1>Hello {user?.name}</h1>
      </main>
    </>
  );
}

HomePage.getLayout = getLayout;
