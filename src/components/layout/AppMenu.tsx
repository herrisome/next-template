import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Badge } from 'primereact/badge';
import { Ripple } from 'primereact/ripple';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

//侧边栏
const AppSubmenu = (props: SUB_MENU) => {
  const NavLink = Link;
  const router = useRouter();

  const onMenuItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: MENU_ITEM
  ) => {
    //跳过禁用的项目
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    //执行命令
    if (item.command) {
      item.command({ originalEvent: event, item: item });
    }

    if (props.onMenuItemClick) {
      props.onMenuItemClick({
        originalEvent: event,
        item: item,
      });
    }
  };

  //渲染链接内容 Badge:标记
  const renderLinkContent = (item: MENU_ITEM) => {
    const submenuIcon = item.items && (
      <i className='pi pi-fw pi-angle-down menuitem-toggle-icon'></i>
    );
    const badge = item.badge && <Badge value={item.badge} />;

    return (
      <React.Fragment>
        <i className={item.icon}></i>
        <span>{item.label}</span>
        {submenuIcon}
        {badge}
        <Ripple />
      </React.Fragment>
    );
  };

  //渲染链接（链接包含链接内容）
  const renderLink = (item: MENU_ITEM) => {
    const content = renderLinkContent(item);

    if (item.to) {
      return (
        <div className='p-ripple'>
          <NavLink href={item.to}>
            <a
              className={`${
                item.to === router.pathname ? 'p-link-active link-active' : ''
              }`}
            >
              {content}
            </a>
          </NavLink>
        </div>
      );
    } else {
      // 多级菜单
      return (
        <div className='p-ripple'>
          <a
            tabIndex={0}
            aria-label={item.label}
            role='menuitem'
            href={item.url}
            onClick={(e) => onMenuItemClick(e, item)}
            target={item.target}
          >
            {content}
          </a>
        </div>
      );
    }
  };

  const items = (props.items as MENU_ITEM[]).map((item, i) => {
    const styleClass = classNames(item.badgeStyleClass, {
      'layout-menuitem-category': props.root,
      'active-menuitem': true,
    });

    //root:是否根节点
    if (props.root) {
      return (
        <li className={styleClass} key={i} role='none'>
          {props.root && (
            <>
              <div
                className='layout-menuitem-root-text'
                aria-label={item.label}
              >
                {item.label}
              </div>
              <AppSubmenu
                items={item.items}
                onMenuItemClick={props.onMenuItemClick}
              />
            </>
          )}
        </li>
      );
    } else {
      return (
        <li className={styleClass} key={i} role='none'>
          {renderLink(item)}
          <CSSTransition
            classNames='layout-submenu-wrapper'
            timeout={{ enter: 1000, exit: 450 }}
            unmountOnExit
          >
            <AppSubmenu
              items={item.items}
              onMenuItemClick={props.onMenuItemClick}
            />
          </CSSTransition>
        </li>
      );
    }
  });

  return items ? (
    <ul className={props.className} role='menu'>
      {items}
    </ul>
  ) : null;
};

export const AppMenu = (props: SUB_MENU) => {
  return (
    <div className='layout-menu-container' style={{ fontSize: '1.2rem' }}>
      <AppSubmenu
        items={props.model}
        className='layout-menu'
        onMenuItemClick={props.onMenuItemClick}
        root={true}
        role='menu'
      />
    </div>
  );
};
