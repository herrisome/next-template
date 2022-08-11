import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';

import cmbcTheme from '@/assets/cmbcChartTheme.json';

echarts.registerTheme('cmbcTheme', cmbcTheme);

const Echarts = (props: { option: object }) => {
  return <ReactECharts {...props} theme='cmbcTheme' />;
};

export default Echarts;
