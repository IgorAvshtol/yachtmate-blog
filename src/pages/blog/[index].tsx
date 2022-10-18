import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Flex, Text } from '@chakra-ui/react';

import { SameArticles } from 'components/SameArticles/SameArticles';
import { PictureAuthorsBlock } from 'components/PictureAuthorsBlock';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getCurrentArticle, setOneViewForArticle } from 'store/atricles/articlesThunk';
import { TimeBlock } from 'components/TimeBlock';
import style from 'styles/article.module.css';
import { ArticlePageWithSkeleton } from 'components/Skeleton/ArticlePageWithSkeleton';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { eng, rus } from 'translation';
import { TypeLoadingStatus } from 'interfaces';

const Article = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { query, locale } = useRouter();
  const t = locale === 'en' ? eng : rus;
  const { currentArticle: data, loading } = useAppSelector(state => state.articles);

  const dataFetchedRef = useRef(false);
  const [html, setHtml] = useState<string>('');
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    const currentArticleURLData = {
      slug: query['index'] as string,
      lang: locale as string,
    };
    if (currentArticleURLData.slug) {
      dispatch(getCurrentArticle(currentArticleURLData));
      setShowChild(true);
      dataFetchedRef.current = true;
    }
    data?.id && dispatch(setOneViewForArticle(data?.id));
  }, [data?.id, dispatch, locale, query]);

  useEffect(() => {
    const fragment = document.createElement('div');
    fragment.innerHTML = data?.attributes?.paragraphs;
    const images = fragment.querySelectorAll('img');

    images.forEach(image => {
      image.src = `${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}${image.getAttribute('src')}`;
      image.removeAttribute('srcset');
    });

    setHtml(fragment.innerHTML);
  }, [data]);

  if (!showChild || loading !== TypeLoadingStatus.IS_RESOLVED) return <ArticlePageWithSkeleton/>;

  return (
      <>
        <Head>
          <title>
            {data?.attributes?.main_title}
          </title>
          <meta
              name='description'
              content={data?.attributes?.meta_title}
          />
        </Head>
        <Flex direction='column' w='100%' alignItems='center' bg='#ffffff'>
          <Flex direction='column' alignItems='center' mt={{ md: '65px', sm: '24px' }} mb={{ md: '64px', sm: '32px' }}
                w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
            <Flex w='100%' justifyContent='start' alignItems='center'>
              <TimeBlock createdAt={data?.attributes?.createdAt} time_to_read={data?.attributes?.time_to_read}/>
              <Sidebar/>
              <Text mx='15px' color='#001240' opacity='0.5'>·</Text>
              <Text fontWeight='500' fontSize='16px' color='#001240' lineHeight='180%' opacity='0.5'>
                {data?.attributes?.view}
              </Text>
              <Text display={{ md: 'block', sm: 'none' }} ml='5px' fontWeight='500' fontSize='16px' color='#001240'
                    lineHeight='180%' opacity='0.5'>
                {data?.attributes?.view < 4 ? t.generalArticlesData.view : t.generalArticlesData.views}
              </Text>
            </Flex>
            <Flex w='100%'>
              <Text as='h1' my='24px' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='120%'
                    letterSpacing={{ md: '1.5px', sm: '0.3px' }} wordBreak='break-word'>
                {data?.attributes?.main_title}
              </Text>
            </Flex>
            <Box mt='20px'>
              <div className={style.description}
                   dangerouslySetInnerHTML={{ __html: data?.attributes?.main_description }}/>
            </Box>
          </Flex>
          <Box w='100%'>
            {data?.attributes?.main_image_url &&
                <Image src={process.env.NEXT_PUBLIC_BASE_IMAGE_URL + data?.attributes?.main_image_url}
                       layout='responsive' width='1440px' height='547px' alt='cormack' priority/>
            }
          </Box>
          <Box w='100%'>
            <Flex direction='column' alignItems='center' bg='#F5F7FB' pb={{ md: '120px', sm: '80px' }}>
              <PictureAuthorsBlock authors={data?.attributes?.main_image_authors}/>
              <Flex direction='column' mb={{ md: '56px', sm: '32px' }}
                    w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
                <Box mt={{ md: '56px', sm: '30px' }}>
                  {
                      html && <div className={style.paragraph} dangerouslySetInnerHTML={{ __html: html }}/>
                  }
                </Box>
                <Box mt={{ md: '80px', sm: '30px' }}>
                  <div className={style.postscriptum}
                       dangerouslySetInnerHTML={{ __html: data?.attributes?.postscriptum }}>
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