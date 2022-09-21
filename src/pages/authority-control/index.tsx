import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

import ComingSoon from '@/components/ComingSoon';
import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const AuthorityControl = () => {
  const toast = useRef<Toast>(null);

  return (
    <>
      <Seo templateTitle='权限控制' />
      <div className='table-responsive  subpixel-antialiased'>
        <div className='card '>
          <Toast ref={toast} />
          <div>
            <h1>权限控制</h1>
            <ComingSoon />
          </div>
        </div>
      </div>
    </>
  );
};

AuthorityControl.getLayout = getLayout;

export default AuthorityControl;
