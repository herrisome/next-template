import axios from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ContextMenu } from 'primereact/contextmenu';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import TreeNode from 'primereact/treenode';
import { TreeTable, TreeTableSelectionKeysType } from 'primereact/treetable';
import React, { useRef, useState } from 'react';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import StatusBadge from '@/components/StatusBadge';

import list from '@/assets/LIST_DATA.json';

const Id = () => {
  const [steps, setStep] = useState<LIST_ITEM[]>(
    list.data as unknown as LIST_ITEM[]
  );
  const [selectedNodekey, setSelectedNodekey] =
    useState<TreeTableSelectionKeysType | null>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const dt = useRef<DataTable>(null);
  const toast = useRef<Toast>(null);
  //导出CSV
  const exportCSV = () => {
    (dt.current as DataTable).exportCSV();
  };
  const cm = useRef(null);
  const items = [
    {
      label: '问题',
      icon: 'pi pi-fw pi-file',
      items: [
        {
          label: '快速新增',
          icon: 'pi pi-fw pi-plus',
        },
        {
          label: '查看已有',
          icon: 'pi pi-fw pi-trash',
        },
        {
          separator: true,
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: '退出',
      icon: 'pi pi-fw pi-power-off',
    },
  ];

  const onInputChange = (e: string, name: string, arr: LIST_ITEM) => {
    const _step = JSON.parse(JSON.stringify(steps));
    const index = _step.findIndex(
      (item: { key: string }) => item.key === arr.key
    );
    _step[index].data[name] = e;
    setStep(_step);
  };

  //左操作栏
  const leftToolbarTemplate = () => {
    return (
      <span className='p-buttonset mr-1'>
        <Button
          label='批量调度'
          icon='pi pi-play'
          className='p-button-success p-button-sm'
          disabled={
            !selectedNodekey || Object.keys(selectedNodekey).length === 0
          }
          // onClick={openNew}
        />
        <Button
          label='批量通知'
          icon='pi pi-phone'
          className='p-button-danger p-button-sm'
          disabled={
            !selectedNodekey || Object.keys(selectedNodekey).length === 0
          }
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
  const actionBodyTemplate = (rowData: LIST_ITEM) => {
    return (
      <div className='actions'>
        <Button
          icon={`pi ${
            rowData.data.status !== '未开始' ? 'pi-replay' : 'pi-play'
          }`}
          className={`p-button-rounded ${
            rowData.data.status !== '未开始'
              ? 'p-button-info'
              : 'p-button-success'
          } mr-2`}
          onClick={() => {
            axios.post('/api/postPersonalSchedulingMsg').then(() => {
              toast.current?.show({
                severity: 'success',
                summary: '成功',
                detail: '调度成功',
                life: 3000,
              });
              onInputChange('进行中', 'status', rowData);
            });
          }}
        />
        {rowData.data.status !== '未开始' &&
          rowData.data.status !== '已完成' && (
            <Button
              icon='pi pi-stop'
              className='p-button-rounded p-button-warning mr-2'
              onClick={() => onInputChange('未开始', 'status', rowData)}
            />
          )}
        <Button
          icon='pi pi-phone'
          className='p-button-rounded p-button-danger mr-2'
          onClick={() => {
            axios.post('/api/postPersonalSchedulingCall').then(() => {
              toast.current?.show({
                severity: 'success',
                summary: '成功',
                detail: '已电话通知 ',
                life: 3000,
              });
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
    <>
      <Seo templateTitle='流程调度' />
      <div className='table-responsive'>
        <ContextMenu model={items} ref={cm}></ContextMenu>
        <div
          className='card '
          onContextMenu={(e) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            cm.current.show(e)
          }
        >
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
            rows={10}
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
              style={{ minWidth: '8rem' }}
              sortable
            />
            <Column body={actionBodyTemplate} style={{ minWidth: '30rem' }} />
          </TreeTable>
        </div>
      </div>
    </>
  );
};

Id.getLayout = getLayout;

export default Id;
