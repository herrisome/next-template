import { useRouter } from 'next/router';
import PrimeReact from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { AppConfig } from '@/components/layout/AppConfig';
import { AppMenu } from '@/components/layout/AppMenu';
import { AppTopbar } from '@/components/layout/AppTopbar';

const menu: MENU[] = [
  {
    label: '统一调度',
    items: [
      {
        label: '仪表盘',
        icon: 'pi pi-fw pi-home',
        to: '/',
      },
      {
        label: '流程调度',
        icon: 'pi pi-fw pi-sync',
        to: '/scheduling-management',
      },
      {
        label: '可视化',
        icon: 'pi pi-fw pi-tablet',
        to: '/visualization',
      },
    ],
  },
  {
    label: '信息管理',
    items: [
      {
        label: '流程维护',
        icon: 'pi pi-fw pi-sync',
        to: '/process-maintenance',
      },
      {
        label: '模板维护',
        icon: 'pi pi-fw pi-table',
        to: '/template-maintenance',
      },
    ],
  },
  {
    label: '后台管理',
    items: [
      {
        label: '权限管控',
        icon: 'pi pi-fw pi-bars',
        to: '/authority-control',
      },
      {
        label: '用户维护',
        icon: 'pi pi-fw pi-id-card',
        to: '/user-maintenance',
      },
      {
        label: '运营分析',
        icon: 'pi pi-fw pi-chart-bar',
        to: '/operational-analysis',
      },
    ],
  },
  // {
  //   disabled: true,
  //   label: 'UI 组件',
  //   icon: 'pi pi-fw pi-sitemap',
  //   items: [
  //     { label: '表单布局', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
  //     { label: '输入框', icon: 'pi pi-fw pi-check-square', to: '/input' },
  //     { label: '附送标签', icon: 'pi pi-fw pi-bookmark', to: '/floatlabel' },
  //   ],
  // },
  // {
  //   disabled: true,
  //   label: '图标',
  //   items: [
  //     {
  //       label: 'PrimeIcons',
  //       icon: 'pi pi-fw pi-prime',
  //       to: '/icons',
  //       badge: '236',
  //     },
  //   ],
  // },
  // {
  //   disabled: true,
  //   label: '页面',
  //   icon: 'pi pi-fw pi-clone',
  //   items: [
  //     { label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud' },
  //     { label: '时间线', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
  //     { label: '空页面', icon: 'pi pi-fw pi-circle-off', to: '/empty' },
  //   ],
  // },
  // {
  //   disabled: true,
  //   label: '多级菜单',
  //   icon: 'pi pi-fw pi-search',
  //   items: [
  //     {
  //       label: '子菜单 1',
  //       icon: 'pi pi-fw pi-bookmark',
  //       items: [
  //         {
  //           label: '子菜单 1.1',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [
  //             { label: '子菜单 1.1.1', icon: 'pi pi-fw pi-bookmark' },
  //             { label: '子菜单 1.1.2', icon: 'pi pi-fw pi-bookmark' },
  //             { label: '子菜单 1.1.3', icon: 'pi pi-fw pi-bookmark' },
  //           ],
  //         },
  //         {
  //           label: '子菜单 1.2',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [
  //             { label: '子菜单 1.2.1', icon: 'pi pi-fw pi-bookmark' },
  //             { label: '子菜单 1.2.2', icon: 'pi pi-fw pi-bookmark' },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       label: '子菜单 2',
  //       icon: 'pi pi-fw pi-bookmark',
  //       items: [
  //         {
  //           label: '子菜单 2.1',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [
  //             { label: '子菜单 2.1.1', icon: 'pi pi-fw pi-bookmark' },
  //             { label: '子菜单 2.1.2', icon: 'pi pi-fw pi-bookmark' },
  //             { label: '子菜单 2.1.3', icon: 'pi pi-fw pi-bookmark' },
  //           ],
  //         },
  //         {
  //           label: '子菜单 2.2',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [
  //             { label: '子菜单 2.2.1', icon: 'pi pi-fw pi-bookmark' },
  //             { label: '子菜单 2.2.2', icon: 'pi pi-fw pi-bookmark' },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

//转换菜单为单层架构
const convertToSingle = (menu: MENU[]) => {
  const result: MENU[] = [];
  menu.forEach((item) => {
    if (item.items) {
      item.items.forEach((subItem) => {
        result.push(subItem as MENU);
      });
    } else {
      result.push(item);
    }
  });
  return result;
};

const convertMenu = convertToSingle(menu);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [layoutMode, setLayoutMode] = useState('static');
  const [layoutColorMode, setLayoutColorMode] = useState('light');
  const [inputStyle, setInputStyle] = useState('outlined');
  const [ripple, setRipple] = useState(true);
  const [staticMenuInactive, setStaticMenuInactive] = useState(false);
  const [overlayMenuActive, setOverlayMenuActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
  const [breadCrumbData, setBreadCrumbData] = useState<
    { label: string; url: string }[]
  >([]);
  const router = useRouter();

  PrimeReact.ripple = true;

  let menuClick = false;
  let mobileTopbarMenuClick = false;

  useEffect(() => {
    const saveColorMode = localStorage.getItem('colorMode');
    saveColorMode && setLayoutColorMode(saveColorMode);
  }, []);

  useEffect(() => {
    if (mobileMenuActive) {
      addClass(document.body, 'body-overflow-hidden');
    } else {
      removeClass(document.body, 'body-overflow-hidden');
    }
  }, [mobileMenuActive]);

  const onInputStyleChange = (inputStyle: React.SetStateAction<string>) => {
    setInputStyle(inputStyle);
  };

  const onRipple = (e: { value: boolean }) => {
    PrimeReact.ripple = e.value;
    setRipple(e.value);
  };

  const onLayoutModeChange = (mode: React.SetStateAction<string>) => {
    setLayoutMode(mode);
  };

  const onColorModeChange = (mode: React.SetStateAction<string>) => {
    setLayoutColorMode(mode);
    localStorage.setItem('colorMode', mode as string);
  };

  const onWrapperClick = () => {
    if (!menuClick) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }

    if (!mobileTopbarMenuClick) {
      setMobileTopbarMenuActive(false);
    }

    mobileTopbarMenuClick = false;
    menuClick = false;
  };

  const onToggleMenuClick = (event: { preventDefault: () => void }) => {
    menuClick = true;

    if (isDesktop()) {
      if (layoutMode === 'overlay') {
        if (mobileMenuActive) {
          setOverlayMenuActive(true);
        }

        setOverlayMenuActive((prevState) => !prevState);
        setMobileMenuActive(false);
      } else if (layoutMode === 'static') {
        setStaticMenuInactive((prevState) => !prevState);
      }
    } else {
      setMobileMenuActive((prevState) => !prevState);
    }

    event.preventDefault();
  };

  const onSidebarClick = () => {
    menuClick = true;
  };

  const onMenuItemClick = (event: { item: { items: MENU_ITEM } }) => {
    if (!event.item.items) {
      setOverlayMenuActive(false);
      setMobileMenuActive(false);
    }
  };
  const isDesktop = () => {
    return window.innerWidth >= 992;
  };

  const addClass = (element: HTMLElement, className: string) => {
    if (element.classList) element.classList.add(className);
    else element.className += ' ' + className;
  };

  const removeClass = (element: HTMLElement, className: string) => {
    if (element.classList) element.classList.remove(className);
    else
      element.className = element.className.replace(
        new RegExp(
          '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
  };

  const wrapperClass = classNames('layout-wrapper', {
    'layout-overlay': layoutMode === 'overlay',
    'layout-static': layoutMode === 'static',
    'layout-static-sidebar-inactive':
      staticMenuInactive && layoutMode === 'static',
    'layout-overlay-sidebar-active':
      overlayMenuActive && layoutMode === 'overlay',
    'layout-mobile-sidebar-active': mobileMenuActive,
    'p-input-filled': inputStyle === 'filled',
    'p-ripple-disabled': !ripple,
    'layout-theme-light': layoutColorMode === 'light',
  });

  useEffect(() => {
    const items: { label: string; url: string }[] = [];
    router.asPath.split('/').forEach((item, index) => {
      if (item !== '') {
        const url = router.asPath
          .split('/')
          .splice(0, index + 1)
          .join('/');

        items.push({
          label:
            convertMenu.filter((e) => e.to == url)[0]?.label || decodeURI(item),
          url: url,
        });
      }
    });
    setBreadCrumbData(items);
  }, [router.asPath]);

  const home = {
    icon: 'pi pi-home',
    url: '/',
  };

  const goLogin = () => {
    router.push('/login');
  };

  return (
    <div className={wrapperClass} onClick={onWrapperClick}>
      <AppTopbar
        onToggleMenuClick={onToggleMenuClick}
        layoutColorMode={layoutColorMode}
        mobileTopbarMenuActive={mobileTopbarMenuActive}
        onMobileTopbarMenuClick={goLogin}
        onMobileSubTopbarMenuClick={goLogin}
      />

      <div className='layout-sidebar' onClick={onSidebarClick}>
        <AppMenu
          model={menu as MENU_ITEM[]}
          onMenuItemClick={onMenuItemClick as unknown as MENU_CLICK}
          layoutColorMode={layoutColorMode}
        />
      </div>

      <div className='layout-main-container'>
        <BreadCrumb
          model={
            (breadCrumbData.length === 0 ? null : breadCrumbData) as MENU_ITEM[]
          }
          home={home}
          className='mb-4'
        />
        <div className='layout-main'>{children}</div>
      </div>

      <AppConfig
        rippleEffect={ripple}
        onRippleEffect={onRipple}
        inputStyle={inputStyle}
        onInputStyleChange={onInputStyleChange}
        layoutMode={layoutMode}
        onLayoutModeChange={onLayoutModeChange}
        layoutColorMode={layoutColorMode}
        onColorModeChange={onColorModeChange}
      />

      <CSSTransition
        classNames='layout-mask'
        timeout={{ enter: 200, exit: 200 }}
        in={mobileMenuActive}
        unmountOnExit
      >
        <div className='layout-mask p-component-overlay'></div>
      </CSSTransition>
    </div>
  );
}

export const getLayout = (page: React.ReactNode) => <Layout>{page}</Layout>;
