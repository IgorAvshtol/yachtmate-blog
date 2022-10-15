import Head from 'next/head';

import { Main } from 'components/Main/Main';

const Home = (): JSX.Element => {
  return (
      <>
        <Head>
          <title>Yachtmate</title>
          <meta
              name='description'
              content='Yachtmate'
          />
        </Head>
        <Main/>
      </>
  );
};

export default Home;