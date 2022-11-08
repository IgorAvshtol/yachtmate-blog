import Head from 'next/head';
import { GetServerSideProps } from 'next';
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
          <Posts articles={articles.data}/>
        </Flex>
      </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const lang = context?.locale;
  const pageSize = context?.query['articles'];
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles?locale=${lang}&pagination[page]=1&pagination[pageSize]=${pageSize || 5}&sort=id%3Adesc`);
  const articles = await response.json();
  return { props: { articles } };
};