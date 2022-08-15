import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import * as React from 'react';
import { SWRConfig } from 'swr';

import '@/styles/globals.css';

import fetchJson from '@/lib/fetchJson';
import theme from '@/theme/theme';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type Props = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: Props) {
  const getLayout = Component.getLayout;

  // eslint-disable-next-line no-console
  console.log(`
    ********************************************************
               _____ _______ _____   _____ _____  
              |_   _|__   __|  __ \\ / ____|  __ \\ 
                | |    | |  | |__) | (___ | |__) |
                | |    | |  |  ___/ \\___ \\|  ___/ 
               _| |_   | |  | |     ____) | |     
              |_____|  |_|  |_|    |_____/|_|     
                                    
    ********************************************************
    `);

  return (
    <SWRConfig
      value={{
        fetcher: fetchJson,
        onError: (err) => {
          return err;
        },
      }}
    >
      <ChakraProvider theme={theme}>
        {getLayout ? (
          getLayout(<Component {...pageProps} />)
        ) : (
          <Component {...pageProps} />
        )}
      </ChakraProvider>
    </SWRConfig>
  );
}
