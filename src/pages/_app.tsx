/* eslint-disable @next/next/no-css-tags */
// noinspection HtmlRequiredTitleElement

import { NextPage } from 'next';
import { AppProps } from 'next/app';
import PrimeReact, { addLocale } from 'primereact/api';
import * as React from 'react';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import '@/styles/globals.css';
import '@/styles/layout/layout.scss';

import fetchJson from '@/lib/fetchJson';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type Props = AppProps & {
  Component: NextPageWithLayout;
};
addLocale('cn', {
  startsWith: '开始',
  contains: '包含',
  notContains: '不包含',
  endsWith: '结尾',
  equals: '等于',
  notEquals: '不等于',
  noFilter: '无过滤',
  lt: '小于',
  lte: '小于或等于',
  gt: '大于',
  gte: '大于或等于',
  dateIs: '日期为',
  dateIsNot: 'Date is not',
  dateBefore: '日期早于',
  dateAfter: '日期晚于',
  custom: '自定义',
  clear: '清除',
  apply: '应用',
  matchAll: '匹配所有',
  matchAny: '匹配任何',
  addRule: '添加规则',
  removeRule: '删除规则',
  accept: '接收',
  reject: '拒绝',
  choose: '选择',
  upload: '上传',
  cancel: '取消',
  dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六'],
  dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
  monthNames: [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一',
    '十二',
  ],
  monthNamesShort: [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十',
    '十一',
    '十二',
  ],
  today: '今日',
  weekHeader: '周',
  firstDayOfWeek: '1',
  dateFormat: 'yy/mm/dd',
  weak: '弱',
  medium: '中',
  strong: '强',
  passwordPrompt: '输入密码',
  emptyFilterMessage: '没有可用的选项',
  emptyMessage: '未找到结果',
});

PrimeReact.ripple = false;
PrimeReact.locale = 'cn';

export default function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout;

  return (
    <RecoilRoot>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            return err;
          },
        }}
      >
        {getLayout ? (
          getLayout(<Component {...pageProps} />)
        ) : (
          <Component {...pageProps} />
        )}
      </SWRConfig>
    </RecoilRoot>
  );
}
// {/*<Script*/}
// {/*  strategy='afterInteractive'*/}
// {/*  id='454'*/}
// {/*  src='/track.js'*/}
// {/*  onLoad={() => {*/}
// {/*    if (webtracing) {*/}
// {/*      webtracing.init({*/}
// {/*        requestUrl: 'http://localhost:3000/api/trackweb/tra',*/}
// {/*        appName: 'itpsp',*/}
// {/*        event: {*/}
// {/*          core: true,*/}
// {/*        },*/}
// {/*        performance: {*/}
// {/*          server: true,*/}
// {/*        },*/}
// {/*        pv: true,*/}
// {/*        error: true,*/}
// {/*      });*/}
// {/*    }*/}
// {/*  }}*/}
// {/*/>*/}
