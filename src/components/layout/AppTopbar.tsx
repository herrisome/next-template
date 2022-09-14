import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { userInfoState } from '@/store/userInfo';

import service from '@/lib/http';

type TOP_BAR_PROPS = {
  layoutColorMode: string;
  onToggleMenuClick: React.MouseEventHandler<HTMLButtonElement>;
  onMobileTopbarMenuClick: React.MouseEventHandler<HTMLButtonElement>;
  mobileTopbarMenuActive: boolean;
  onMobileSubTopbarMenuClick: React.MouseEventHandler<HTMLButtonElement>;
};

//顶部栏
export const AppTopbar = (props: TOP_BAR_PROPS) => {
  const [userInfo] = useRecoilState(userInfoState);
  const [, setUserInfo] = useRecoilState(userInfoState);
  const router = useRouter();

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const { data } = await service.get('/api/v1/getinfo');
    data.code === 401 && router.push('/login');
    setUserInfo(data.data);
  };

  return (
    <div className='layout-topbar'>
      <Link href='/'>
        <a className='layout-topbar-logo'>
          <img
            src={
              props.layoutColorMode === 'light'
                ? '/images/test.svg'
                : '/images/test.svg'
            }
            alt='logo'
          />
          <span className='text-gradient'>ITPSP</span>
        </a>
      </Link>

      <button
        type='button'
        className='p-link  layout-menu-button layout-topbar-button'
        onClick={props.onToggleMenuClick}
      >
        <i className='pi pi-bars' />
      </button>

      <button
        type='button'
        className='p-link layout-topbar-menu-button layout-topbar-button'
        onClick={props.onMobileTopbarMenuClick}
      >
        <i className='pi pi-ellipsis-v' />
      </button>

      <ul
        className={classNames('layout-topbar-menu origin-top lg:flex', {
          'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive,
        })}
      >
        <li>
          <button
            className='p-link layout-topbar-button'
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className='pi pi-calendar' />
            <span>事件</span>
          </button>
        </li>
        <li>
          <button
            className='p-link layout-topbar-button'
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className='pi pi-cog' />
            <span>设置</span>
          </button>
        </li>
        <li>
          <button
            className='p-link layout-topbar-button'
            onClick={props.onMobileSubTopbarMenuClick}
          >
            <i className='pi pi-user' />
            <span>{JSON.stringify(userInfo)}</span>
            <span>配置</span>
          </button>
        </li>
      </ul>
    </div>
  );
};
