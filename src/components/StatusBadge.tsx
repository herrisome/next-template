import { Badge } from 'primereact/badge';
import * as React from 'react';
import useSWR from 'swr';

import http from '@/lib/http';

type DICT = { label: string; value: string };
type DICT_DATA = {
  data: {
    data: DICT[];
  };
};

const StatusBadge = (rowData: { data: LIST_ITEM_DATA }) => {
  const { data } = rowData;
  const { data: dict } = useSWR<DICT_DATA>(
    '/api/v1/dict-data/option-select?dictType=schedule_task_status',
    http.get
  );

  const statusMap = ['warning', 'info', 'success'];

  if (!dict) {
    return null;
  }
  return (
    <>
      <Badge
        value={dict?.data?.data[data.state as unknown as number].label}
        severity={
          statusMap[data.state as unknown as number] as
            | 'warning'
            | 'info'
            | 'success'
        }
      />
    </>
  );
};

export default StatusBadge;
