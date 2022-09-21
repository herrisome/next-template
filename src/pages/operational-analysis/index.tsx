import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

import ComingSoon from '@/components/ComingSoon';
import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const OperationalAnalysis = () => {
  const toast = useRef<Toast>(null);

  return (
    <>
      <Seo templateTitle='运营分析' />
      <div className='table-responsive  subpixel-antialiased'>
        <div className='card '>
          <Toast ref={toast} />
          <div>
            <h1>运营分析</h1>
            <ComingSoon />
          </div>
        </div>
      </div>
    </>
  );
};

OperationalAnalysis.getLayout = getLayout;

export default OperationalAnalysis;
