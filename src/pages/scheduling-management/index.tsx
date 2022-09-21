import { useRouter } from 'next/router';
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
  const router = useRouter();
  // const header = ;

  return (
    <>
      <Seo templateTitle='流程调度' />
      <div className='table-responsive  subpixel-antialiased'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
          <Toast ref={toast} />
          {data.reverse().map((e) => (
            <div key={e.id}>
              <Card
                className='overflow-hidden'
                title={e.missionName}
                subTitle={e.executionDate}
                footer={() => (
                  <span className='flex items-center justify-end'>
                    <Button
                      label='调度'
                      icon='pi pi-sync'
                      onClick={() => {
                        router.push(`/scheduling-management/${e.missionName}`);
                      }}
                    />
                    <Button
                      label='可视化'
                      icon='pi pi-tablet'
                      className='p-button-secondary ml-2'
                      onClick={() => {
                        window.open(e.url);
                      }}
                    />
                  </span>
                )}
                header={() => (
                  <img alt='Card' src={e.img} className='h-60 w-full' />
                )}
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
