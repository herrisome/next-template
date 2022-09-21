import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

import ComingSoon from '@/components/ComingSoon';
import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const Visualization = () => {
  alert;
  const toast = useRef<Toast>(null);

  return (
    <>
      <Seo templateTitle='可视化' />
      <div className='table-responsive  subpixel-antialiased'>
        <div className='card '>
          <Toast ref={toast} />
          <div>
            <h1>可视化</h1>
            <ComingSoon />
            <div
              className='p-datatable p-component p-datatable-responsive-scroll'
              data-scrollselectors='.p-datatable-wrapper'
            >
              <div className='p-datatable-wrapper'>
                <table className='p-datatable-table'>
                  <thead className='p-datatable-thead'>
                    <tr>
                      <th>
                        <div className='p-column-header-content'>
                          <span className='p-column-title'>编号</span>
                        </div>
                      </th>
                      <th>
                        <div className='p-column-header-content'>
                          <span className='p-column-title'>姓名</span>
                        </div>
                      </th>
                      <th>
                        <div className='p-column-header-content'>
                          <span className='p-column-title'>类别</span>
                        </div>
                      </th>
                      <th>
                        <div className='p-column-header-content'>
                          <span className='p-column-title'>数量</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='p-datatable-tbody'>
                    <tr role='row' className=''>
                      <td className='' role='cell'>
                        f230fh0g3
                      </td>
                      <td className='' role='cell'>
                        竹表
                      </td>
                      <td className='' role='cell'>
                        配件
                      </td>
                      <td className='' role='cell'>
                        24
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Visualization.getLayout = getLayout;

export default Visualization;
