// noinspection JSIgnoredPromiseFromCall

import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import TreeNode from 'primereact/treenode';
import { TreeTable, TreeTableSelectionKeysType } from 'primereact/treetable';
import React, { useRef, useState } from 'react';

import { getLayout } from '@/components/layout/Layout';
import StatusBadge from '@/components/StatusBadge';

import list from '@/assets/LIST_DATA.json';

const Id = () => {
  const [steps] = useState<LIST_ITEM[]>(list.data as unknown as LIST_ITEM[]);
  const [selectedNodekey, setSelectedNodekey] =
    useState<TreeTableSelectionKeysType | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef<DataTable>(null);
  const toast = useRef<Toast>(null);
  //导出CSV
  const exportCSV = () => {
    (dt.current as DataTable).exportCSV();
  };
  //左操作栏
  const leftToolbarTemplate = () => {
    return (
      <span className='p-buttonset mr-1'>
        <Button
          label='批量调度'
          icon='pi pi-play'
          className='p-button-success p-button-sm'
          // onClick={openNew}
        />
        <Button
          label='批量通知'
          icon='pi pi-phone'
          className='p-button-danger p-button-sm'
          // onClick={confirmDeleteSelected}
        />
      </span>
    );
  };

  // 右操作栏
  const rightToolbarTemplate = () => {
    return (
      <>
        <Button
          // label='导出'
          icon='pi pi-cloud-download'
          className='p-button-help p-button-sm'
          onClick={exportCSV}
        />
      </>
    );
  };

  // 操作按钮
  const actionBodyTemplate = () => {
    //TODO: rowData: LIST_ITEM
    return (
      <div className='actions'>
        <Button
          icon='pi pi-play'
          className='p-button-rounded p-button-success mr-2'
          onClick={() => {
            axios.post('/api/postPersonalSchedulingMsg');
          }}
        />
        <Button
          icon='pi pi-phone'
          className='p-button-rounded p-button-danger mr-2'
          onClick={() => {
            (toast.current as Toast).show({
              severity: 'warn',
              summary: '功能停用',
              detail: '发送电话消息权限审核中，通过后启用',
              life: 3000,
            });
          }}
        />
      </div>
    );
  };

  // 表格顶部
  const header = (
    <div className='flex items-center justify-between'>
      <h5 className='m-0'>调度控制</h5>
      <span>
        <span className='p-inputgroup'>
          <InputText
            type='search'
            onInput={(e) =>
              setGlobalFilter((e.target as HTMLTextAreaElement).value)
            }
            placeholder='全局搜索'
          />
        </span>
      </span>
    </div>
  );

  return (
    <div className='table-responsive'>
      <div className='card '>
        <Toast ref={toast} />
        <Toolbar
          className='mb-4'
          right={rightToolbarTemplate}
          left={leftToolbarTemplate}
        />

        <TreeTable
          header={header}
          value={steps as TreeNode[]}
          selectionMode='checkbox'
          selectionKeys={selectedNodekey}
          onSelectionChange={(e) => setSelectedNodekey(e.value)}
          paginator
          rows={20}
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          globalFilter={globalFilter}
          className='md:text-lg'
        >
          <Column
            field='id'
            header='序号'
            sortable
            style={{ minWidth: '6rem' }}
            expander
          />
          <Column
            field='missionName'
            header='任务名称'
            sortable
            style={{ minWidth: '14rem' }}
          />
          <Column
            field='executor'
            header='执行人'
            sortable
            style={{ minWidth: '8rem' }}
          />
          <Column
            field='department'
            header='部门'
            headerClassName='sm-invisible'
            bodyClassName='sm-invisible'
            style={{ minWidth: '8rem' }}
            sortable
          />
          <Column
            field='startingTime'
            header='开始时间'
            sortable
            headerClassName='sm-invisible'
            bodyClassName='sm-invisible'
            style={{ minWidth: '8rem' }}
          />
          <Column
            field='endTime'
            header='结束时间'
            style={{ minWidth: '8rem' }}
            sortable
            headerClassName='sm-invisible'
            bodyClassName='sm-invisible'
          />
          <Column
            field='status'
            header='状态'
            body={StatusBadge}
            style={{ minWidth: '6rem' }}
            sortable
          />
          <Column body={actionBodyTemplate} />
        </TreeTable>
      </div>
    </div>
  );
};

Id.getLayout = getLayout;

export default Id;
