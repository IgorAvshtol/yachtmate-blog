import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import parse from 'html-react-parser';
import { Box, Flex, Text } from '@chakra-ui/react';

import { SameArticles } from 'components/SameArticles/SameArticles';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { PictureAuthorsBlock } from 'components/PictureAuthorsBlock';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getCurrentArticle } from 'store/atricles/articlesThunk';
import { TimeBlock } from 'components/TimeBlock';
import { SidebarDown } from 'components/Sidebar/SidebarDown';

const Article = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { query, locale } = useRouter();
  const { currentArticle: data } = useAppSelector(state => state.articles);

  useEffect(() => {
    const currentArticleURLData = {
      slug: query['index'] as string,
      lang: locale as string,
      id: data?.id
    };
    dispatch(getCurrentArticle(currentArticleURLData));
  }, [locale, dispatch, query, data?.id]);

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
              <Text mx='15px'>·</Text>
              <Text fontWeight='500' fontSize='16px' color='#001240' lineHeight='180%' opacity='0.5'>
                {data?.attributes?.view}
              </Text>
            </Flex>
            <Text as='h1' my='24px' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='120%'
                  letterSpacing={{ md: '1.5px', sm: '0.3px' }} wordBreak='break-word'>
              {data?.attributes?.main_title}
            </Text>
            {
              data?.attributes?.main_description.map((description, index) => (
                      <Text key={nanoid()} mt='20px' fontSize={{ md: '24px', sm: '20px' }} lineHeight='180%'>
                        {description[index]}
                      </Text>
                  )
              )
            }
          </Flex>
          <Box w='100%'>
            {data?.attributes?.main_image?.url &&
                <Image src={data?.attributes?.main_image.url} layout='responsive' width='1440px' height='547px'
                       alt='cormack'/>
            }
          </Box>
          <Box w='100%'>
            <Flex direction='column' alignItems='center' bg='#F5F7FB' pb={{ md: '120px', sm: '80px' }}>
              <PictureAuthorsBlock authors={data?.attributes?.main_image?.image_authors}/>
              <Flex direction='column' mb={{ md: '56px', sm: '32px' }}
                    w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
                {
                  data?.attributes?.paragraphs.map(paragraph => (
                      <Flex direction='column' key={nanoid()}>
                        {
                            paragraph.title &&
                            <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600'
                                  fontSize='32px'
                                  lineHeight='140%'
                                  letterSpacing='0.3px'>{paragraph.title}</Text>
                        }
                        {
                            paragraph.image &&
                            <>
                              <Image src={paragraph.image} layout='responsive' width={800}
                                     height={paragraph.image_height} alt={paragraph.image_alt}/>
                              <Text mt='16px' textAlign='center' fontWeight='500' fontSize='14px' lineHeight='140%'
                                    letterSpacing='0.5' opacity='0.5'>
                                Author: Daniel Guerra
                              </Text>
                            </>
                        }
                        {
                          paragraph.description.map((part, index) => (
                                  <Text key={nanoid()} mt='32px' fontWeight='400' fontSize={{ md: '20px', sm: '18px' }}
                                        lineHeight='180%'>
                                    {part[index]}
                                  </Text>
                              )
                          )
                        }
                      </Flex>
                  ))
                }
                <Box mt={{ md: '80px', sm: '30px' }}>
                  {
                    data?.attributes?.postscriptum.map((paragraph, index) => (
                        <Text key={nanoid()} mt='60px' fontWeight='400' fontSize={{ md: '24px', sm: '20px' }}
                              lineHeight='180%'>
                          {parse(paragraph[index])}
                        </Text>
                    ))
                  }
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