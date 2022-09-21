import Link from 'next/link';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useRef, useState } from 'react';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import list from '@/assets/SCHEDULING_LIST.json';

const ProcessMaintenance = () => {
  const [data] = useState<SCHEDULING_ITEM[]>(list.data);
  const toast = useRef<Toast>(null);

  // 操作按钮
  const actionBodyTemplate = (rowData: SCHEDULING_ITEM) => {
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
        {rowData.missionStatus !== '已完成' ? (
          <Button
            icon='pi pi-trash'
            label='发布'
            className='p-button-rounded p-button-success mt-2'
            // onClick={() => confirmDeleteStep(rowData)}
          />
        ) : (
          <Button
            icon='pi pi-trash'
            label='取消发布'
            className='p-button-rounded p-button-info mt-2'
            // onClick={() => confirmDeleteStep(rowData)}
          />
        )}
        <Button
          icon='pi pi-trash'
          label='复制'
          className='p-button-rounded p-button-warning mt-2'
          // onClick={() => confirmDeleteStep(rowData)}
        />
      </div>
    );
  };

  const missionOfTheMeetingBodyTemplate = (rowData: {
    missionName: string;
  }) => {
    return (
      <Link href={`/process-maintenance/${rowData.missionName}`}>
        <a
          className='font-bold underline subpixel-antialiased '
          style={{ color: 'var(--primary-color)' }}
        >
          {rowData.missionName}
        </a>
      </Link>
    );
  };
  const minutesOfTheMeetingBodyTemplate = (rowData: {
    minutesOfTheMeeting: string;
  }) => {
    return (
      // <Link href={`/process-maintenance/${rowData.minutesOfTheMeeting}`}>
      <div
        className='text-blue-500 underline subpixel-antialiased'
        // style={{ color: 'var(--primary-color)' }}
        onClick={() => {
          window.open(
            'https://scs3r9euo4.feishu.cn/docx/doxcnVmC6MYBxKYBV4pJhdEgmCc?from=from_copylink'
          );
        }}
      >
        {rowData.minutesOfTheMeeting}
      </div>
      // </Link>
    );
  };
  const questionListBodyTemplate = (rowData: { questionList: string }) => {
    return (
      // <Link href={`/process-maintenance/${rowData.questionList}`}>
      <div
        className='text-blue-500 underline subpixel-antialiased'
        // style={{ color: 'var(--primary-color)' }}
      >
        {rowData.questionList}
      </div>
      // </Link>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <>
        <Button
          label='新增'
          icon='pi pi-plus'
          className='p-button-help p-button-sm'
          // onClick={exportCSV}
        />
      </>
    );
  };

  return (
    <>
      <Seo templateTitle='流程维护' />
      <div className='table-responsive  subpixel-antialiased'>
        <div className='card '>
          <Toolbar
            className='mb-4'
            right={rightToolbarTemplate}
            // left={leftToolbarTemplate}
          />
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
              style={{ minWidth: '6rem' }}
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
              body={missionOfTheMeetingBodyTemplate}
              sortable
              style={{ minWidth: '16rem' }}
            />
            <Column
              field='minutesOfTheMeeting'
              header='会议纪要'
              body={minutesOfTheMeetingBodyTemplate}
              sortable
              style={{ minWidth: '10rem' }}
            />
            <Column
              field='questionList'
              header='问题清单'
              body={questionListBodyTemplate}
              sortable
              style={{ minWidth: '8rem' }}
            />
            {/*<Column*/}
            {/*  field='questionList'*/}
            {/*  header='状态'*/}
            {/*  style={{ minWidth: '8rem' }}*/}
            {/*/>*/}
            <Column body={actionBodyTemplate} style={{ minWidth: '16rem' }} />
          </DataTable>
        </div>
      </div>
    </>
  );
};

ProcessMaintenance.getLayout = getLayout;

export default ProcessMaintenance;
