import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { marked } from 'marked';
import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';

import { SameArticles } from 'components/SameArticles/SameArticles';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { PictureAuthorsBlock } from 'components/PictureAuthorsBlock';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getCurrentArticle, setOneViewForArticle } from 'store/atricles/articlesThunk';
import { TimeBlock } from 'components/TimeBlock';
import { SidebarDown } from 'components/Sidebar/SidebarDown';
import style from 'styles/article.module.css';
import { TypeLoadingStatus } from '../../interfaces';
import { ArticlePageWithSkeleton } from '../../components/Skeleton/ArticlePageWithSkeleton';

const Article = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { query, locale } = useRouter();
  const { currentArticle: data, loading } = useAppSelector(state => state.articles);

  useEffect(() => {
    const currentArticleURLData = {
      slug: query['index'] as string,
      lang: locale as string,
      id: data?.id
    };
    dispatch(getCurrentArticle(currentArticleURLData));
    dispatch(setOneViewForArticle(data?.id));
  }, [locale, dispatch, query, data?.id]);

  if (loading !== TypeLoadingStatus.IS_RESOLVED) {
    return (
        <>
          <ArticlePageWithSkeleton/>
        </>
    );
  }

  return (
      <>
        <Head>
          <title>
            {data?.attributes?.meta_title}
          </title>
        </Head>
        <Flex direction='column' w='100%' alignItems='center' bg='#ffffff'>
          <Flex direction='column' alignItems='center' mt={{ md: '65px', sm: '24px' }} mb={{ md: '64px', sm: '32px' }}
                w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
            <Sidebar/>
            <SidebarDown/>
            <Flex w='100%' justifyContent='start' alignItems='center'>
              <TimeBlock createdAt={data?.attributes?.createdAt} time_to_read={data?.attributes?.time_to_read}/>
              <Text mx='15px' color='#001240' opacity='0.5'>·</Text>
              <Text fontWeight='500' fontSize='16px' color='#001240' lineHeight='180%' opacity='0.5'>
                {data?.attributes?.view}
              </Text>
            </Flex>
            <Text as='h1' my='24px' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='120%'
                  letterSpacing={{ md: '1.5px', sm: '0.3px' }} wordBreak='break-word'>
              {data?.attributes?.main_title}
            </Text>
            <Box mt='20px'>
              <div className={style.description}>
                {data?.attributes?.main_description && parse(marked(data?.attributes?.main_description))}
              </div>
            </Box>
          </Flex>
          <Box w='100%'>
            {data?.attributes?.main_image_url &&
                <Image src={data?.attributes?.main_image_url} layout='responsive' width='1440px' height='547px'
                       alt='cormack'/>
            }
          </Box>
          <Box w='100%'>
            <Flex direction='column' alignItems='center' bg='#F5F7FB' pb={{ md: '120px', sm: '80px' }}>
              <PictureAuthorsBlock authors={data?.attributes?.main_image_authors}/>
              <Flex direction='column' mb={{ md: '56px', sm: '32px' }}
                    w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
                <Box mt={{ md: '56px', sm: '30px' }}>
                  <div className={style.paragraph}>
                    {data?.attributes?.paragraphs && parse(marked(data?.attributes?.paragraphs))}
                  </div>
                </Box>
                <Box mt={{ md: '80px', sm: '30px' }}>
                  <div className={style.postscriptum}>
                    {data?.attributes?.postscriptum && parse(marked(data?.attributes?.postscriptum))}
                  </div>
                </Box>
              </Flex>
            </Flex>
          </Box>
          <SameArticles/>
        </Flex>
      </>
  );
};

export default Article;