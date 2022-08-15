import * as React from 'react';
import { TbError404 } from 'react-icons/tb';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <Layout>
      <Seo templateTitle='页面未找到' />

      <main>
        <section>
          <div className='layout text-black flex  h-full flex-col items-center justify-center text-center'>
            <TbError404
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='text-1xl mt-8 md:text-2xl'>页面未找到</h1>
          </div>
        </section>
      </main>
    </Layout>
  );
}
