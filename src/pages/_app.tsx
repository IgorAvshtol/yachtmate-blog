import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Layout } from 'components/Layout';
import { ProvideApp } from 'hooks/useAppContext';

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({
  breakpoints,
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black',
      }
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 500,
        letterSpacing: '0.02em',
        _hover: {
          bgColor: 'white'
        },
        color: 'white',
        _focus: {
          boxShadow: 'none',
          border: '1px solid gray'
        }
      }
    },
    Text: {
      baseStyle: {
        fontWeight: 500,
        color: '#001240',
        letterSpacing: '0.02em'
      }
    }
  }
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
      <ProvideApp>
        <ChakraProvider theme={theme}>
          <Layout>
            <Head>
              <title>Yachtmate</title>
              <meta name='yachtmate' content='Yachtmate yacht sea ocean chill weekend'/>
            </Head>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ProvideApp>
  );
};

export default MyApp;