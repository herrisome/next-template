import dynamic from 'next/dynamic';
import { Button } from 'primereact/button';
import { Calendar, CalendarDateTemplateParams } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useEffect, useState } from 'react';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import list from '@/assets/SCHEDULING_LIST.json';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const chartData = [
  {
    name: '应急演练',
    data: [65, 59, 80, 81, 56, 25, 40, 65, 59, 80, 81, 56],
    fill: false,
    backgroundColor: '#165DFF',
    borderColor: '#165DFF',
    tension: 0.4,
  },
  {
    name: '重大变更',
    data: [40, 80, 65, 59, 81, 56, 55, 40, 80, 65, 59, 81],
    fill: false,
    backgroundColor: '#F53F3F',
    borderColor: '#F53F3F',
    tension: 0.4,
  },
  {
    name: '应急演练',
    data: [35, 59, 8, 56, 55, 81, 40, 35, 59, 8, 56, 55],
    fill: false,
    backgroundColor: '#14C9C9',
    borderColor: '#14C9C9',
    tension: 0.4,
  },
  {
    name: '年终决算',
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15],
    fill: false,
    backgroundColor: '#FADC19',
    borderColor: '#FADC19',
    tension: 0.4,
  },
];

// const ProcessSchedulingData = list.data.map((e) => {
//     return {
//         missionName: e.missionName,
//         missionType: e.missionType,
//         missionStartTime: e.missionStartTime,
//         missionEndTime: e.missionEndTime,
//         missionStatus: e.missionStatus,
//         missionProgress: e.missionProgress,
//     };
// }

const xAxis = [
  '2022-01',
  '2022-02',
  '2022-03',
  '2022-04',
  '2022-05',
  '2022-06',
  '2022-07',
  '2022-08',
  '2022-09',
  '2022-10',
  '2022-11',
  '2022-12',
];

const Dashboard = () => {
  const [products] = useState<CHART_ITEM[]>(
    list.data as unknown as CHART_ITEM[]
  );
  const [colorMode, setColorMode] = useState<string>('light');

  const TABLE_DATA = [
    {
      name: '关基演练',
      date: '2022-09-01 05:00:00',
      numberOfTimes: '72',
    },
    {
      name: '应急演练',
      date: '2022-08-21 04:54:00',
      numberOfTimes: '36',
    },
    {
      name: '重大变更',
      date: '2022-09-15 17:04:00',
      numberOfTimes: '48',
    },
    {
      name: '年终决算',
      date: '2022-12-31 18:23:00',
      numberOfTimes: '45',
    },
  ];

  useEffect(() => {
    const colorMode = localStorage.getItem('colorMode');
    colorMode && setColorMode(colorMode);
  }, []);

  //TODO：增加颜色模式订阅
  useEffect(() => {
    if (colorMode === 'light') {
      // applyLightTheme();
    } else {
      // applyDarkTheme();
    }
  }, [colorMode]);

  const dateTemplate = (date: CalendarDateTemplateParams) => {
    if ([1, 7, 13, 22, 30].includes(date.day)) {
      return (
        <strong
          className='rounded p-4'
          style={{
            backgroundColor: 'rgb(254, 176, 25)',
            color: '#fff',
          }}
        >
          {date.day}
        </strong>
      );
    }
    if ([3, 9, 15, 24, 29].includes(date.day)) {
      return (
        <strong
          className='rounded p-4'
          style={{
            backgroundColor: 'rgb(255, 69, 96)',
            color: '#fff',
          }}
        >
          {date.day}
        </strong>
      );
    }

    return date.day;
  };

  return (
    <div>
      <Seo templateTitle='仪表盘' />
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4 '>
        {TABLE_DATA.map(({ name, date, numberOfTimes }, i) => (
          <div
            key={i}
            className='card mb-0'
            // style={{ backgroundColor: 'var(--primary-color)' }}
          >
            <div className=' mb-3 flex justify-between'>
              <div>
                <span className='text-error mb-3 block text-2xl font-medium'>
                  {name}
                </span>
                <div className='text-900 text-xl font-medium'>{date}</div>
              </div>
              <div className='flex h-6 w-6 items-center justify-center rounded md:h-10 md:w-10'>
                <i className='pi pi-bolt text-xl text-blue-500' />
              </div>
            </div>
            <span className='text-500 mr-1'>已完成调度</span>
            <span className='font-medium text-green-500'>
              {numberOfTimes}次
            </span>
          </div>
        ))}
      </div>
      <div className='grid-cols-2 gap-4 md:grid'>
        <div>
          <div className='card' style={{ padding: 0 }}>
            <Calendar
              value={new Date()}
              inline
              showWeek
              style={{ width: '999rem', border: 'none' }}
              dateTemplate={dateTemplate}
            />
          </div>
          <div className='card'>
            <h5>最近的调度</h5>
            <DataTable
              value={products}
              rows={5}
              paginator
              responsiveLayout='scroll'
            >
              <Column
                header=''
                body={(data) => (
                  <img
                    className='rounded-full border'
                    src='https://artbreeder.b-cdn.net/imgs/f496bf93f13046c86bb6519e2b60.jpeg'
                    alt={data.image}
                    width='32'
                  />
                )}
              />
              <Column field='missionName' header='流程名称' />
              <Column field='executionDate' header='调度日期' sortable />
              <Column field='timeConsuming' header='耗时(min)' sortable />
              <Column field='questionList' header='记录问题' sortable />
              <Column
                header='查看'
                body={() => (
                  <Button
                    icon='pi pi-search'
                    type='button'
                    className='p-button-text'
                  />
                )}
              />
            </DataTable>
          </div>
        </div>

        <div>
          <div className='card'>
            <h5>调度问题趋势</h5>
            <ReactApexChart
              options={{
                theme: {
                  mode: colorMode as 'light' | 'dark',
                },
                chart: {
                  dropShadow: {
                    enabled: true,
                    top: 0,
                    left: 0,
                    blur: 0.5,
                    opacity: 0.5,
                  },
                  toolbar: {
                    tools: {
                      download: true,
                    },
                    autoSelected: 'zoom',
                  },
                  background: 'rgba(0,0,0,0)',
                },
                xaxis: {
                  categories: xAxis,
                  title: {
                    text: '月份',
                  },
                },
                yaxis: {
                  title: {
                    text: '问题数',
                  },
                },
                stroke: {
                  curve: 'smooth',
                },
              }}
              series={chartData}
              type='line'
              height={350}
            />
          </div>
          <div className='card'>
            <div className='align-items-center justify-content-between mb-4 flex'>
              <h5>近期消息</h5>
            </div>
            <span className='text-600 mb-3 block font-medium'>昨天</span>
            <ul className='m-0 list-none divide-y p-0'>
              {[1, 2].map((e, i) => (
                <li
                  key={i}
                  className='align-items-center border-bottom-1 my-2 flex py-2'
                >
                  <div className='mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100'>
                    <i className='pi pi-check text-xl text-green-500' />
                  </div>
                  <span className='mr-1 text-xl leading-10'>
                    李明：
                    <span className='text-xl'>
                      <span className='text-green-500'>完成了</span>
                      XXXIX检查 确认系统运行情况，检查并处理异常交易
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Dashboard.getLayout = getLayout;

export default Dashboard;
