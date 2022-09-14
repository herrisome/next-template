import axios from 'axios';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';

import { getLayout } from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const UserMaintenance = (props: { login: object }) => {
  const toast = useRef<Toast>(null);

  return (
    <>
      <Seo templateTitle='用户维护' />
      <div className='table-responsive  subpixel-antialiased'>
        <div className='card '>
          <Toast ref={toast} />
          <div>
            <h1>用户维护</h1>
            <h1>{JSON.stringify(props.login)}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

UserMaintenance.getLayout = getLayout;

export async function getServerSideProps() {
  const res = await axios.post(`http://localhost:8000/api/v1/login`, {
    code: '0',
    password: '123456',
    username: 'zhangjian',
    uuid: '0',
  });

  //设置token

  return {
    props: { login: res.data }, // will be passed to the page component as props
  };
}

export default UserMaintenance;
