import { Badge } from 'primereact/badge';
import * as React from 'react';

const StatusBadge = (rowData: { data: never }) => {
  const { data } = rowData;
  //
  // const { data: dict } = useSWR(
  //   '/api/v1/dict-data/option-select?dictType=schedule_task_status',
  //   http.get
  // );
  //
  // console.log(dict?.data?.data);
  // //
  // // console.log(rowData);
  // //
  // // const statusMap = () => {
  // //   let type = 'error';
  // //   switch (data.status) {
  // //     case '0':
  // //       type = 'warning';
  // //       break;
  // //     case '1':
  // //       type = 'info';
  // //       break;
  // //     case '2':
  // //       type = 'success';
  // //       break;
  // //   }
  // //   return type;
  // // };
  return (
    <>
      <Badge
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        value={data.state}
        // severity={statusMap() as BadgeSeverityType}
        severity='success'
      />
    </>
  );
};

export default StatusBadge;
