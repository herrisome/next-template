import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import list from '@/assets/SCHEDULING_LIST.json';

const ProcessScheduling = () => {
  const [data] = useState<SCHEDULING_ITEM[]>(list.data);
  const toast = useRef<Toast>(null);

  const header = (
    <img
      alt='Card'
      src='https://user-images.githubusercontent.com/44428735/188424944-5fc4afea-f2fb-4191-a916-85830c289870.png'
      className='h-60 w-full'
    />
  );
  const footer = (
    <span className='flex items-center justify-end'>
      <Button label='调度' icon='pi pi-sync' />
      <Button
        label='可视化'
        icon='pi pi-tablet'
        className='p-button-secondary ml-2'
      />
    </span>
  );

  return (
    <>
      <Seo templateTitle='流程调度' />
      <div className='table-responsive  subpixel-antialiased'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
          <Toast ref={toast} />
          {data.map((e) => (
            <div key={e.id}>
              <Card
                className='overflow-hidden'
                title={e.missionName}
                subTitle={e.executionDate}
                footer={footer}
                header={header}
              >
                <ProgressBar
                  className='bg-gray-200'
                  value={eval(e.missionProgress) * 100}
                ></ProgressBar>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

ProcessScheduling.getLayout = getLayout;

export default ProcessScheduling;
