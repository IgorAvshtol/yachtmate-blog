import React from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { Layout } from 'components/Layout';
import { store } from 'store/store';

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({
  breakpoints,
  fonts: {
    heading: `'Gilroy', sans-serif`,
    body: `'Gilroy', sans-serif`,
  },
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
        color: 'white',
        _focus: {
          boxShadow: 'none',
          border: '1px solid gray'
        }
      }
    },
    Text: {
      baseStyle: {
        fontFamily: `'Gilroy', sans-serif`,
        fontWeight: 500,
        color: '#001240',
        letterSpacing: '0.02em'
      }
    }
  }
});

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Head>
              <title>Yachtmate</title>
              <meta name='yachtmate' content='Yachtmate yacht sea ocean chill weekend'/>
            </Head>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Provider>
  );
};

export default MyApp;