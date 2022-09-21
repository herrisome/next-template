import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

import ComingSoon from '@/components/ComingSoon';
import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const TemplateMaintenance = () => {
  const toast = useRef<Toast>(null);

  return (
    <>
      <Seo templateTitle='模板维护' />
      <div className='table-responsive  subpixel-antialiased'>
        <div className='card '>
          <Toast ref={toast} />
          <div>
            <h1>模板维护</h1>
            <ComingSoon />
          </div>
        </div>
      </div>
    </>
  );
};

TemplateMaintenance.getLayout = getLayout;

export default TemplateMaintenance;
