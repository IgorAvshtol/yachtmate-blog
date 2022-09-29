import Head from 'next/head';
import { Box, Flex, Skeleton } from '@chakra-ui/react';

import { useAppSelector } from 'store/store';

export const ArticlePageWithSkeleton = (): JSX.Element => {
  const { currentArticle: data } = useAppSelector(state => state.articles);

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
            <Flex w='100%' justifyContent='start' alignItems='center'>
              <Skeleton w='400px' h='30px'/>
            </Flex>
            <Skeleton mt='20px' w='100%' h='100px'/>
            <Skeleton mt='20px' w='100%' h='200px'/>
          </Flex>
          <Skeleton mt='20px' w='100%' h='547px'/>
          <Box w='100%'>
            <Flex direction='column' alignItems='center' bg='#F5F7FB' pb={{ md: '120px', sm: '80px' }}>
              <Skeleton mt='20px' w='150px' h='30px'/>
              <Flex direction='column' mb={{ md: '56px', sm: '32px' }}
                    w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
                <Skeleton mt='20px' w='100%' h='1000px'/>
                <Box mt={{ md: '80px', sm: '30px' }}>
                  <Skeleton mt='20px' w='100%' h='400px'/>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </>
  );
};