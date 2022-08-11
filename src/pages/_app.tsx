import { NextPage } from 'next';
import { AppProps } from 'next/app';
import * as React from 'react';
import { SWRConfig } from 'swr';

import '@/styles/globals.css';

import fetchJson from "@/lib/fetchJson";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type Props = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout;

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          return (err);
        },
      }}
    >
      {getLayout ? (
        getLayout(<Component {...pageProps} />)
      ) : (
        <Component {...pageProps} />
      )}
    </SWRConfig>
  );
}
