import axios from 'axios';
import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ContextMenu } from 'primereact/contextmenu';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import TreeNode from 'primereact/treenode';
import { TreeTable, TreeTableSelectionKeysType } from 'primereact/treetable';
import React, { useRef, useState } from 'react';
import useSWR from 'swr';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import StatusBadge from '@/components/StatusBadge';

import http from '@/lib/http';

type SCHEDULE_DATA = { data: LIST_ITEM_DATA[] };
type DICT_DATA = {
  data: SCHEDULE_DATA;
};

const Id = () => {
  //获取调度步骤信息
  const { data } = useSWR<DICT_DATA>('/api/v1/schedule-list', http.get);

  const [selectedNodekey, setSelectedNodekey] =
    useState<TreeTableSelectionKeysType | null>(null);

  const [globalFilter, setGlobalFilter] = useState('');
  const toast = useRef<Toast>(null);

  const exportCSV = () => {
    //TODO 导出CSV (dt.current as DataTable).exportCSV();
    // const dt = useRef<DataTable>(null);
  };

  //右键菜单
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

  /**
   * 开始调度
   * @param arr
   */
  const startSchedule = (arr: LIST_ITEM) => {
    const _step = JSON.parse(JSON.stringify(arr.data));

    delete _step.createBy;
    delete _step.createdAt;
    delete _step.updateBy;
    delete _step.updatedAt;

    _step.realStartTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    _step.state = '1';

    //方法：消息通知
    // axios.post('/api/postPersonalSchedulingMsg').then(() => {

    http.put(`/api/v1/schedule-list/${_step.id}`, _step).then((res) => {
      toast.current?.show({
        severity: res.data.code === 200 ? 'success' : 'error',
        summary: res.data.code === 200 ? '成功' : '失败',
        detail: res.data.code === 200 ? '更新成功' : '更新失败',
        life: 3000,
      });
    });
  };

  /**
   * 停止调度
   * @param arr
   */
  const stopSchedule = (arr: LIST_ITEM) => {
    const _step = JSON.parse(JSON.stringify(arr.data));

    //TODO 批量删除
    delete _step.createBy;
    delete _step.createdAt;
    delete _step.updateBy;
    delete _step.updatedAt;

    _step.realStartTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    _step.state = '0';

    //TODO 消息撤回 /api/postPersonalSchedulingMsg

    http.put(`/api/v1/schedule-list/${_step.id}`, _step).then((res) => {
      toast.current?.show({
        severity: res.data.code === 200 ? 'success' : 'error',
        summary: res.data.code === 200 ? '成功' : '失败',
        detail: res.data.code === 200 ? '更新成功' : '更新失败',
        life: 3000,
      });
    });
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
          //TODO onClick={批量调度}
        />
        <Button
          label='批量通知'
          icon='pi pi-phone'
          className='p-button-danger p-button-sm'
          disabled={
            !selectedNodekey || Object.keys(selectedNodekey).length === 0
          }
          //TODO onClick={批量通知}
        />
      </span>
    );
  };

  /**
   * 电话通知
   * @constructor
   */
  const SchedulingCall = () => {
    //TODO 根据执行人电话通知

    axios.post('/api/postPersonalSchedulingCall').then(() => {
      toast.current?.show({
        severity: 'success',
        summary: '成功',
        detail: '已电话通知 ',
        life: 3000,
      });
    });
  };

  // 右操作栏
  const rightToolbarTemplate = () => {
    return (
      <>
        <Button
          label='导出'
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
          icon={`pi ${rowData.data.state !== '0' ? 'pi-replay' : 'pi-play'}`}
          className={`p-button-rounded ${
            rowData.data.state !== '0' ? 'p-button-info' : 'p-button-success'
          } mr-2`}
          tooltip={`${rowData.data.state !== '0' ? '任务调度' : '重新发起'}`}
          onClick={() => {
            startSchedule(rowData);
            //TODO 刷新数据
          }}
        />
        {rowData.data.state !== '0' && rowData.data.state !== '2' && (
          <Button
            icon='pi pi-stop'
            className='p-button-rounded p-button-warning mr-2'
            onClick={() => stopSchedule(rowData)}
            tooltip='停止调度'
          />
        )}
        <Button
          icon='pi pi-phone'
          className='p-button-rounded p-button-danger mr-2'
          disabled={rowData.data.state === '0'}
          tooltip='电话通知'
          onClick={SchedulingCall}
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

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Seo templateTitle='流程调度' />
      <div className='table-responsive'>
        <ContextMenu model={items} ref={cm}></ContextMenu>
        <div
          className='card '
          //TODO 增加右键功能 onContextMenu={(e) => cm.current.show(e)}
        >
          <Toast ref={toast} />
          <Toolbar
            className='mb-4'
            right={rightToolbarTemplate}
            left={leftToolbarTemplate}
          />

          <TreeTable
            header={header}
            value={data?.data?.data as TreeNode[]}
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
              field='stepNo'
              header='序号'
              sortable
              style={{ minWidth: '6rem' }}
              expander
            />
            <Column
              field='stepName'
              header='任务名称'
              sortable
              style={{ minWidth: '14rem' }}
            />
            <Column
              field='dutyUserName'
              header='执行人'
              sortable
              style={{ minWidth: '8rem' }}
            />
            <Column
              field='dutyOrg'
              header='部门'
              headerClassName='sm-invisible'
              bodyClassName='sm-invisible'
              style={{ minWidth: '8rem' }}
              sortable
            />
            <Column
              field='realStartTime'
              header='开始时间'
              sortable
              headerClassName='sm-invisible'
              bodyClassName='sm-invisible'
              style={{ minWidth: '8rem' }}
            />
            <Column
              field='realEndTime'
              header='结束时间'
              style={{ minWidth: '8rem' }}
              sortable
              headerClassName='sm-invisible'
              bodyClassName='sm-invisible'
            />
            <Column
              field='state'
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
