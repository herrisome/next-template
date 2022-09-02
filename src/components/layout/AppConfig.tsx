import classNames from 'classnames';
import { Button } from 'primereact/button';
import { InputSwitch, InputSwitchChangeParams } from 'primereact/inputswitch';
import { RadioButton } from 'primereact/radiobutton';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export const AppConfig = (props: {
  onColorModeChange: (arg0: string) => void;
  onInputStyleChange: (arg0: string) => void;
  inputStyle: string;
  rippleEffect: boolean;
  onRippleEffect: ((e: InputSwitchChangeParams) => void) | undefined;
  onLayoutModeChange: (arg0: string) => void;
  layoutColorMode: string;
  layoutMode: string;
}) => {
  const [active, setActive] = useState(false);
  const [scale, setScale] = useState(12);
  const [scales] = useState([12, 14, 16, 18]);
  const [theme, setTheme] = useState('soho-light');
  const config = useRef(null);
  const outsideClickListener = useRef(null);

  const unbindOutsideClickListener = useCallback(() => {
    if (outsideClickListener.current) {
      document.removeEventListener('click', outsideClickListener.current);
      outsideClickListener.current = null;
    }
  }, []);

  const hideConfigurator = useCallback(
    (event: { preventDefault: () => void }) => {
      setActive(false);
      unbindOutsideClickListener();
      event.preventDefault();
    },
    [unbindOutsideClickListener]
  );

  const decrementScale = () => {
    setScale((prevState) => prevState - 2);
  };

  const incrementScale = () => {
    setScale((prevState) => prevState + 2);
  };

  useEffect(() => {
    const saveTheme = localStorage.getItem('theme');
    saveTheme && setTheme(saveTheme);
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = scale + 'px';
  }, [scale]);

  const toggleConfigurator = () => {
    setActive(true);
  };

  const configClassName = classNames('layout-config', {
    'layout-config-active': active,
  });

  useEffect(() => {
    const themeElement = document.getElementById('theme-link') as HTMLElement;
    const themeHref = '/themes/' + theme + '/theme.css';
    const replaceLink = (linkElement: HTMLElement, href: string) => {
      if (isIE()) {
        linkElement.setAttribute('href', href);
      } else {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true) as HTMLElement;

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');
        const parentNode = linkElement.parentNode as HTMLElement;

        parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
          linkElement.remove();
          cloneLinkElement.setAttribute('id', id as string);
        });
      }
    };
    replaceLink(themeElement, themeHref);
  }, [theme]);

  const isIE = () => {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  };

  const changeTheme = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    theme: React.SetStateAction<string>,
    scheme: string
  ) => {
    props.onColorModeChange(scheme);
    setTheme(theme);
    localStorage.setItem('theme', theme as string);
  };

  return (
    <div ref={config} className={configClassName} id='layout-config'>
      <button
        className='layout-config-button p-link'
        id='layout-config-button'
        onClick={toggleConfigurator}
      >
        <i className='pi pi-cog'></i>
      </button>
      <Button
        className='p-button-danger layout-config-close p-button-rounded p-button-text'
        icon='pi pi-times'
        onClick={hideConfigurator}
      />

      <div className='layout-config-content'>
        <h5 className='mt-0'>界面缩放</h5>
        <div className='config-scale'>
          <Button
            icon='pi pi-minus'
            onClick={decrementScale}
            className='p-button-text'
            disabled={scale === scales[0]}
          />
          {scales.map((item) => {
            return (
              <i
                className={classNames('pi pi-circle-on', {
                  'scale-active': item === scale,
                })}
                key={item}
              />
            );
          })}
          <Button
            icon='pi pi-plus'
            onClick={incrementScale}
            className='p-button-text'
            disabled={scale === scales[scales.length - 1]}
          />
        </div>

        <h5>输入框样式</h5>
        <div className='p-formgroup-inline'>
          <div className='field-radiobutton'>
            <RadioButton
              inputId='input_outlined'
              name='inputstyle'
              value='outlined'
              onChange={(e) => props.onInputStyleChange(e.value)}
              checked={props.inputStyle === 'outlined'}
            />
            <label htmlFor='input_outlined'>Outlined</label>
          </div>
          <div className='field-radiobutton'>
            <RadioButton
              inputId='input_filled'
              name='inputstyle'
              value='filled'
              onChange={(e) => props.onInputStyleChange(e.value)}
              checked={props.inputStyle === 'filled'}
            />
            <label htmlFor='input_filled'>Filled</label>
          </div>
        </div>

        <h5>涟漪效果</h5>
        <InputSwitch
          checked={props.rippleEffect}
          onChange={props.onRippleEffect}
        />

        <h5>菜单类型</h5>
        <div className='p-formgroup-inline'>
          <div className='field-radiobutton'>
            <RadioButton
              inputId='static'
              name='layoutMode'
              value='static'
              onChange={(e) => props.onLayoutModeChange(e.value)}
              checked={props.layoutMode === 'static'}
            />
            <label htmlFor='static'>静态</label>
          </div>
          <div className='field-radiobutton'>
            <RadioButton
              inputId='overlay'
              name='layoutMode'
              value='overlay'
              onChange={(e) => props.onLayoutModeChange(e.value)}
              checked={props.layoutMode === 'overlay'}
            />
            <label htmlFor='overlay'>覆盖</label>
          </div>
        </div>

        <h5>主题</h5>

        {themeList.map(({ collection, content }) => (
          <div key={collection}>
            <h6 className='mt-2'>{collection}</h6>
            <div key={theme} className='free-themes grid grid-cols-4'>
              {content.map(({ theme, scheme, imgSrc, alt }) => (
                <div key={theme} className='mb-4 text-center'>
                  <button
                    className='p-link shadow'
                    onClick={(e) => changeTheme(e, theme, scheme)}
                  >
                    <img src={imgSrc} alt={alt} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const themeList = [
  {
    collection: '现代',
    content: [
      {
        theme: 'soho-light',
        scheme: 'light',
        imgSrc: '/images/themes/soho-light.png',
        alt: 'Soho Light',
      },
      {
        theme: 'soho-dark',
        scheme: 'dark',
        imgSrc: '/images/themes/soho-dark.png',
        alt: 'Soho Dark',
      },
      {
        theme: 'lara-light-teal',
        scheme: 'light',
        imgSrc: '/images/themes/lara-light-teal.png',
        alt: 'Lara Light Teal',
      },
      {
        theme: 'lara-dark-teal',
        scheme: 'dark',
        imgSrc: '/images/themes/lara-dark-teal.png',
        alt: 'Lara Dark Teal',
      },
      {
        theme: 'viva-light',
        scheme: 'light',
        imgSrc: '/images/themes/viva-light.svg',
        alt: 'Viva Light',
      },
      {
        theme: 'viva-dark',
        scheme: 'dark',
        imgSrc: '/images/themes/viva-dark.svg',
        alt: 'Viva Dark',
      },
      {
        theme: 'saga-orange',
        scheme: 'light',
        imgSrc: '/images/themes/saga-orange.png',
        alt: 'Saga Orange',
      },
      {
        theme: 'vela-orange',
        scheme: 'dim',
        imgSrc: '/images/themes/vela-orange.png',
        alt: 'Vela Orange',
      },
      {
        theme: 'arya-orange',
        scheme: 'dark',
        imgSrc: '/images/themes/arya-orange.png',
        alt: 'Arya Orange',
      },
    ],
  },
  {
    collection: '简约',
    content: [
      {
        theme: 'fluent-light',
        scheme: 'light',
        imgSrc: '/images/themes/fluent-light.png',
        alt: 'Fluent Light',
      },
      {
        theme: 'nova',
        scheme: 'light',
        imgSrc: '/images/themes/nova.png',
        alt: 'Nova Light',
      },
      {
        theme: 'luna-blue',
        scheme: 'dark',
        imgSrc: '/images/themes/luna-blue.png',
        alt: 'Luna Blue Dark',
      },
      {
        theme: 'nano',
        scheme: 'light',
        imgSrc: '/images/themes/nano.jpg',
        alt: 'Nano',
      },
    ],
  },
  {
    collection: '设计体系',
    content: [
      {
        theme: 'bootstrap4-light-purple',
        scheme: 'light',
        imgSrc: '/images/themes/bootstrap4-light-purple.svg',
        alt: 'Bootstrap Light Purple',
      },
      {
        theme: 'bootstrap4-dark-purple',
        scheme: 'dark',
        imgSrc: '/images/themes/bootstrap4-dark-purple.svg',
        alt: 'Bootstrap Dark Purple',
      },
      {
        theme: 'md-light-indigo',
        scheme: 'light',
        imgSrc: '/images/themes/md-light-indigo.svg',
        alt: 'Material Light Indigo',
      },
      {
        theme: 'md-dark-indigo',
        scheme: 'dark',
        imgSrc: '/images/themes/md-dark-indigo.svg',
        alt: 'Material Dark Indigo',
      },
    ],
  },
];
