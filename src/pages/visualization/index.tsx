import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const Visualization = () => {
  const toast = useRef<Toast>(null);

  return (
    <>
      <Seo templateTitle='可视化' />
      <div className='table-responsive  subpixel-antialiased'>
        <div className='card '>
          <Toast ref={toast} />
          <div>
            <h1>Visualization</h1>
          </div>
        </div>
      </div>
    </>
  );
};

Visualization.getLayout = getLayout;

export default Visualization;
