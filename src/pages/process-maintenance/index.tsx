import Link from 'next/link';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import list from '@/assets/SCHEDULING_LIST.json';

const ProcessMaintenance = () => {
  const [data] = useState<SCHEDULING_ITEM[]>(list.data);
  const toast = useRef<Toast>(null);

  // 操作按钮
  const actionBodyTemplate = () => {
    //TODO rowData: SCHEDULING_ITEM
    return (
      <div className='actions'>
        <Button
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success mr-2'
          // onClick={() => editStep(rowData as LIST_ITEM)}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger mr-2'
          // onClick={() => confirmDeleteStep(rowData)}
        />
        <Button
          icon='pi pi-trash'
          label='发布'
          className='p-button-rounded p-button-danger mt-2'
          // onClick={() => confirmDeleteStep(rowData)}
        />
      </div>
    );
  };

  const minutesOfTheMeetingBodyTemplate = (rowData: {
    minutesOfTheMeeting: string;
  }) => {
    return (
      <Link href={`/process-maintenance/${rowData.minutesOfTheMeeting}`}>
        <a
          className='underline subpixel-antialiased '
          style={{ color: 'var(--primary-color)' }}
        >
          {rowData.minutesOfTheMeeting}
        </a>
      </Link>
    );
  };
  const questionListBodyTemplate = (rowData: { questionList: string }) => {
    return (
      <Link href={`/process-maintenance/${rowData.questionList}`}>
        <a
          className='underline subpixel-antialiased '
          style={{ color: 'var(--primary-color)' }}
        >
          {rowData.questionList}
        </a>
      </Link>
    );
  };

  return (
    <>
      <Seo templateTitle='流程维护' />
      <div className='table-responsive  subpixel-antialiased'>
        <div className='card '>
          <Toast ref={toast} />

          <DataTable
            value={data}
            paginator
            rows={10}
            selectionMode='checkbox'
            dataKey='id'
            responsiveLayout='scroll'
            stateStorage='custom'
            className='md:text-lg'
          >
            <Column
              header='任务分类'
              filterField='taskClassification'
              field='taskClassification'
              filter
              style={{ minWidth: '8rem' }}
            />
            <Column
              field='executionDate'
              header='执行日期'
              sortable
              style={{ minWidth: '8rem' }}
            />
            <Column
              field='missionName'
              header='任务名称'
              sortable
              style={{ minWidth: '16rem' }}
            />
            <Column
              field='minutesOfTheMeeting'
              header='会议纪要'
              body={minutesOfTheMeetingBodyTemplate}
              sortable
              style={{ minWidth: '20rem' }}
            />
            <Column
              field='questionList'
              header='问题清单'
              body={questionListBodyTemplate}
              sortable
              style={{ minWidth: '8rem' }}
            />
            <Column
              field='questionList'
              header='状态'
              style={{ minWidth: '8rem' }}
            />
            <Column body={actionBodyTemplate} style={{ minWidth: '16rem' }} />
          </DataTable>
        </div>
      </div>
    </>
  );
};

ProcessMaintenance.getLayout = getLayout;

export default ProcessMaintenance;
