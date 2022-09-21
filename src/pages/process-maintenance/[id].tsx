import classNames from 'classnames';
import dayjs from 'dayjs';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Calendar, CalendarChangeParams } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import {
  Dropdown,
  DropdownChangeParams,
  DropdownValueTemplateType,
} from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import TreeNode from 'primereact/treenode';
import {
  TreeTable,
  TreeTableCheckboxSelectionKeyType,
  TreeTableSelectionKeysType,
} from 'primereact/treetable';
import React, { useRef, useState } from 'react';

import { getLayout } from '@/components/layout/Layout';

import list from '@/assets/LIST_DATA.json';

const StepMaintenance = () => {
  const emptySteps: LIST_ITEM = {
    key: '',
    data: {
      id: '',
      executor: '',
      missionName: '',
      department: '',
      startingTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      endTime: '',
      status: '未开始',
    },
  };

  const [steps, setSteps] = useState<LIST_ITEM[]>(
    list.data as unknown as LIST_ITEM[]
  );
  const [selectedNodekey, setSelectedNodekey] =
    useState<TreeTableSelectionKeysType | null>(null);
  const [stopDialog, setStopDialog] = useState(false);
  const [deleteStepDialog, setDeleteStepDialog] = useState(false);
  const [deleteStepsDialog, setDeleteStepsDialog] = useState(false);
  const [step, setStep] = useState<LIST_ITEM>(emptySteps);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [createNewFilter, setCreateNewFilter] = useState(false);
  const toast = useRef<Toast>(null);
  const dt = useRef<DataTable>(null);

  const openNew = () => {
    setStep(emptySteps);
    setCreateNewFilter(true);
    setSubmitted(false);
    setStopDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setStopDialog(false);
  };

  const hideDeleteStepDialog = () => {
    setDeleteStepDialog(false);
  };

  const hideDeleteStepsDialog = () => {
    setDeleteStepsDialog(false);
  };

  const findIndexById = (id: string): number => {
    let index = -1;
    for (let i = 0; i < steps.length; i++) {
      if (String(steps[i].data.id) === String(id)) {
        index = i;
        break;
      }
    }
    return index;
  };

  const findIndexByKey = (key: string): number => {
    let index = -1;
    for (let i = 0; i < steps.length; i++) {
      if (String(steps[i].key) === String(key)) {
        index = i;
        break;
      }
    }
    return index;
  };

  //按ID查找是否存在
  const findDoesItExistById = (arr: LIST_ITEM[], id: string): boolean => {
    for (const value of arr) {
      if (value.data.id === id) {
        return true;
      }
    }
    return false;
  };

  // 编辑表格
  const saveStep = () => {
    setSubmitted(true);

    if (step.data.missionName.trim() && step.data.id.trim()) {
      const _steps = JSON.parse(JSON.stringify(steps));
      const _step = JSON.parse(JSON.stringify(step));
      const commitStep = () => {
        (toast.current as Toast).show({
          severity: 'success',
          summary: '成功',
          detail: '步骤已更新',
          life: 3000,
        });
        setSteps(_steps);
        setStopDialog(false);
        setStep(emptySteps);
      };
      //步骤更新
      if (findIndexByKey(step.key) !== -1) {
        const index = findIndexByKey(step.key);
        _steps[index] = _step;
        commitStep();
        //步骤增加
      } else {
        _step.key = _step.data.id;

        const HIERARCHY = _step.data.id.split('.');

        // 层级处理
        const recursiveQueryForExistence = () => {
          if (HIERARCHY.length > 3) {
            (toast.current as Toast).show({
              severity: 'error',
              summary: '失败',
              detail: '层级超出模板限制，请减少层级或修改模板！',
              life: 3000,
            });
            return 0;
          } else if (HIERARCHY.length === 2) {
            if (!findDoesItExistById(_steps, _step.data.id)) {
              _steps.push(_step);
              commitStep();
            } else {
              (toast.current as Toast).show({
                severity: 'error',
                summary: '失败',
                detail: '步骤ID已存在',
                life: 3000,
              });
            }
            return 0;
          } else {
            HIERARCHY.pop();
            const fatherId = HIERARCHY.join('.');
            const fatherIndex = findIndexById(fatherId);
            if (!_steps[fatherIndex].children) {
              _steps[fatherIndex].children = [];
              _steps[fatherIndex].children.push(_step);
              commitStep();
            } else if (
              !findDoesItExistById(_steps[fatherIndex].children, _step.data.id)
            ) {
              _steps[fatherIndex].children.push(_step);
              commitStep();
            } else {
              (toast.current as Toast).show({
                severity: 'error',
                summary: '失败',
                detail: '步骤ID已存在',
                life: 3000,
              });
            }
          }
        };

        recursiveQueryForExistence();
      }
    }
  };

  //子任务处理

  const editStep = (step: LIST_ITEM) => {
    setStep({ ...step });
    setCreateNewFilter(false);
    setStopDialog(true);
  };

  const confirmDeleteStep = (step: LIST_ITEM) => {
    setStep(step);
    setDeleteStepDialog(true);
  };

  //删除数据
  const deleteStep = () => {
    const _steps = (steps as LIST_ITEM[]).filter((val) => val.key !== step.key);
    setSteps(_steps);
    setDeleteStepDialog(false);
    setStep(emptySteps);
    (toast.current as Toast).show({
      severity: 'success',
      summary: '成功',
      detail: '步骤已删除',
      life: 3000,
    });
  };

  //导出CSV
  const exportCSV = () => {
    (dt.current as DataTable).exportCSV();
  };

  // 确认删除
  const confirmDeleteSelected = () => {
    setDeleteStepsDialog(true);
  };

  // 删除选中数据
  const deleteSelectedNode = () => {
    const _steps = steps.filter((val) => {
      const { checked, partialChecked } = (selectedNodekey?.[
        val.key
      ] as TreeTableCheckboxSelectionKeyType) || {
        checked: false,
        partialChecked: false,
      };

      //部分选中
      if (partialChecked) {
        val.children = (val.children as LIST_ITEM[]).filter(
          (children) =>
            !(
              selectedNodekey?.[
                children.key
              ] as TreeTableCheckboxSelectionKeyType
            )?.checked
        );
      }

      return !checked;
    });
    setSteps(_steps);
    setDeleteStepsDialog(false);
    setSelectedNodekey(null);

    (toast.current as Toast).show({
      severity: 'success',
      summary: '成功',
      detail: '步骤已删除',
      life: 3000,
    });
  };

  //更新文字
  const onInputChange = (
    e: DropdownChangeParams | InputTextProps,
    name: string
  ) => {
    const val = 'target' in e && e.target && e.target.value;
    const _step = JSON.parse(JSON.stringify(step));
    _step.data[`${name as keyof LIST_ITEM_DATA}`] = val;

    setStep(_step);
  };

  interface LIST_ITEM_DATE {
    startingTime: Date;
    endTime: Date;
  }

  //更新时间
  const onDateChange = (
    e: CalendarChangeParams,
    name: keyof LIST_ITEM_DATE
  ) => {
    const val = e.target.value;
    const _step = JSON.parse(JSON.stringify(step));
    _step.data[`${name}`] = dayjs(val as unknown as string).format(
      'YYYY-MM-DD HH:mm:ss'
    );

    setStep(_step);
  };

  //左操作栏
  const leftToolbarTemplate = () => {
    return (
      <span className='p-buttonset mr-1'>
        <Button
          // label='新增'
          icon='pi pi-plus'
          className='p-button-success p-button-sm'
          onClick={openNew}
        />
        <Button
          // label='删除'
          icon='pi pi-trash'
          className='p-button-danger p-button-sm'
          disabled={
            !selectedNodekey || Object.keys(selectedNodekey).length === 0
          }
          onClick={confirmDeleteSelected}
        />
      </span>
    );
  };

  const chooseOptions = {
    icon: 'pi pi-fw pi-cloud-upload',
    label: '导入',
    className: 'p-button-sm',
  };

  // 右操作栏
  const rightToolbarTemplate = () => {
    return (
      <>
        <FileUpload
          url='https://primefaces.org/primereact/showcase/upload.php'
          mode='basic'
          accept='csv/xls/xlsx'
          maxFileSize={1000000}
          chooseOptions={chooseOptions}
          className='mr-1'
        />
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
          icon='pi pi-pencil'
          className='p-button-rounded p-button-success mr-2'
          onClick={() => editStep(rowData as LIST_ITEM)}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger mt-2'
          onClick={() => confirmDeleteStep(rowData)}
        />
      </div>
    );
  };

  // 表格顶部
  const header = (
    <div className='flex items-center justify-between'>
      <h5 className='m-0'>步骤管理</h5>
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

  //编辑数据弹窗底部按钮
  const stepDialogFooter = (
    <>
      <Button
        label='取消'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDialog}
      />
      <Button
        label='保存'
        icon='pi pi-check'
        className='p-button-text'
        onClick={saveStep}
      />
    </>
  );

  //删除选中数据弹窗底部按钮
  const deleteStepDialogFooter = (
    <>
      <Button
        label='否'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteStepDialog}
      />
      <Button
        label='是'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteStep}
      />
    </>
  );

  //删除全部数据弹窗底部按钮
  const deleteStepsDialogFooter = (
    <>
      <Button
        label='否'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteStepsDialog}
      />
      <Button
        label='是'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteSelectedNode}
      />
    </>
  );

  const dropdownTemplate = (option: string) => {
    return <Badge value={option} />;
  };

  return (
    <div className='table-responsive'>
      <div className='card '>
        <Toast ref={toast} />
        <Toolbar
          className='mb-4'
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
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
          {/*<Column*/}
          {/*  field='status'*/}
          {/*  header='状态'*/}
          {/*  body={StatusBadge}*/}
          {/*  style={{ minWidth: '6rem' }}*/}
          {/*  sortable*/}
          {/*/>*/}
          <Column
            body={actionBodyTemplate}
            headerClassName='sm-invisible'
            bodyClassName='sm-invisible'
          />
        </TreeTable>

        {/*数据编辑*/}
        <Dialog
          visible={stopDialog}
          header='步骤详情'
          modal
          className='p-fluid w-11/12 md:w-6/12 lg:w-3/12'
          footer={stepDialogFooter}
          onHide={hideDialog}
        >
          <div className='field'>
            <label htmlFor='id'>步骤编号</label>
            <InputText
              keyfilter='num'
              id='id'
              value={step.data.id}
              onChange={(e) => onInputChange(e, 'id')}
              disabled={!createNewFilter}
              required
              autoFocus
              className={classNames({
                'p-invalid': submitted && !step.data.id,
              })}
            />
            {submitted && !step.data.id && (
              <small className='p-invalid text-red'>请填写步骤编号</small>
            )}
          </div>
          <div className='field'>
            <label htmlFor='missionName'>步骤名称</label>
            <InputText
              id='missionName'
              value={step.data.missionName}
              onChange={(e) => onInputChange(e, 'missionName')}
              required
              autoFocus
              className={classNames({
                'p-invalid': submitted && !step.data.missionName,
              })}
            />
            {submitted && !step.data.missionName && (
              <small className='p-invalid text-red'>请填写步骤名称</small>
            )}
          </div>
          <div className='field'>
            <label htmlFor='description'>执行人</label>
            <InputText
              id='executor'
              value={step.data.executor}
              onChange={(e) => onInputChange(e, 'executor')}
              required
            />
          </div>
          <div className='field'>
            <label htmlFor='department'>部门</label>
            <Dropdown
              value={step.data.department}
              options={[
                '信息科技部',
                '数据管理部',
                '运营管理部',
                '个人金融部',
                '网络金融部',
              ]}
              onChange={(e) => onInputChange(e, 'department')}
              placeholder='选择部门'
              valueTemplate={dropdownTemplate as DropdownValueTemplateType}
              itemTemplate={dropdownTemplate}
            />
          </div>
          <div className='formgrid grid'>
            <div className='field col-12'>
              <label htmlFor='time24'>开始时间</label>
              <Calendar
                id='time24'
                value={new Date(step.data.startingTime)}
                onChange={(e) => onDateChange(e, 'startingTime')}
                showTime
                showSeconds
              />
            </div>
          </div>
        </Dialog>

        <Dialog
          visible={deleteStepDialog}
          header='警告'
          modal
          footer={deleteStepDialogFooter}
          onHide={hideDeleteStepDialog}
        >
          <div className='align-items-center justify-content-center flex'>
            <i
              className='pi pi-exclamation-triangle mr-3'
              style={{ fontSize: '2rem' }}
            />
            {step && (
              <span>
                是否确定删除<b>{step.data.missionName}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteStepsDialog}
          header='警告'
          modal
          footer={deleteStepsDialogFooter}
          onHide={hideDeleteStepsDialog}
        >
          <div className='align-items-center justify-content-center flex'>
            <i
              className='pi pi-exclamation-triangle mr-3'
              style={{ fontSize: '2rem' }}
            />
            {step && <span>您确定要删除选定的步骤吗?</span>}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

StepMaintenance.getLayout = getLayout;

export default StepMaintenance;
