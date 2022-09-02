import { Badge, BadgeSeverityType } from 'primereact/badge';
import * as React from 'react';

const StatusBadge = (rowData: LIST_ITEM) => {
  const { data } = rowData;

  const statusMap = () => {
    let type = 'error';
    switch (data.status) {
      case '未开始':
        type = 'warning';
        break;
      case '进行中':
        type = 'info';
        break;
      case '已完成':
        type = 'success';
        break;
    }
    return type;
  };
  return (
    <>
      <Badge value={data.status} severity={statusMap() as BadgeSeverityType} />
    </>
  );
};

export default StatusBadge;
