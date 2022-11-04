import Head from 'next/head';

import { Main } from 'components/Main/Main';
import { GetStaticProps } from 'next';

const Home = ({articles}:any): JSX.Element => {
  return (
      <>
        <Head>
          <title>Yachtmate</title>
          <meta
              name='description'
              content='Yachtmate'
          />
        </Head>
        <Main articles={articles}/>
      </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context?.locale;
  const response = await fetch(`https://adminblog.test.yachtmate.club/api/articles?locale=${lang}&pagination[page]=1&pagination[pageSize]=5&sort=id%3Aasc`);
  const articles = await response.json();
  return { props: { articles } };
};