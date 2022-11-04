import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Flex } from '@chakra-ui/react';

import { MainPosts } from 'components/Main/MainPosts/MainPosts';
import { Posts } from 'components/Main/Posts';
import { IResponseArticles } from 'interfaces';

interface IGetStaticProps {
  articles: IResponseArticles,
}

const Home = ({ articles }: IGetStaticProps): JSX.Element => {
  return (
      <>
        <Head>
          <title>Yachtmate</title>
          <meta name='description' content='Yachtmate-blog'/>
        </Head>
        <Flex direction='column' alignItems='center' w='100%' mt={{ md: '65px', sm: '24px' }}>
          <MainPosts articles={articles.data}/>
          <Posts/>
        </Flex>
      </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const lang = context?.locale;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH}/articles?locale=${lang}&pagination[page]=1&pagination[pageSize]=5&sort=id%3Aasc`);
  const articles = await response.json();
  return { props: { articles } };
};