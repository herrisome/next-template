// pages/_document.js
/* eslint-disable @next/next/no-css-tags */
// noinspection HtmlRequiredTitleElement
// noinspection HtmlRequiredTitleElement

import { Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          id='theme-link'
          rel='stylesheet'
          href='/themes/soho-light/theme.css'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
