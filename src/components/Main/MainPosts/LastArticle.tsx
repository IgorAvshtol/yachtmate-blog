import Image from 'next/image';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { Box, Flex, Text } from '@chakra-ui/react';

import { useAppSelector } from 'store/store';
import { Wrapper } from '../../Wrapper';
import { IArticleData, TypeLoadingStatus } from 'interfaces';
import { LastArticleWithSkeleton } from '../../Skeleton/LastArticleWithSkeleton';
import { ParsedUrlQuery } from 'querystring';
import { string } from 'prop-types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { instance } from '../../../api';

export const LastArticle = ({ articles: aa }: any): JSX.Element => {
  const router = useRouter();
  const { loading } = useAppSelector(state => state.articles);
  const articles = aa.data[aa.data.length-1];
  // console.log('aa',aa.data.reverse()[0]);
  // if (loading === TypeLoadingStatus.IS_PENDING) return <LastArticleWithSkeleton/>;

  return (
      <Wrapper slug={articles?.attributes.slug} borderRadius='12px' _hover={{ textDecoration: 'none' }}>
        <Flex h='100%' direction='column' maxW='690px' w={{ '2xl': '690px', xl: '690px', lg: '95%', md: '95%' }}
              borderRadius='12px' bg='#F5F7FB' p='20px'>
          <Box borderRadius='8px' overflow='hidden'>
            {
                articles?.attributes?.main_image_url &&
                <Image
                    src={process.env.NEXT_PUBLIC_BASE_IMAGE_URL + articles?.attributes?.main_image_url + '?resize=650x313&embed'}
                    layout='responsive' width='650px' height='313px' objectFit='cover' alt='cover' priority/>
            }
          </Box>
          <Text my='16px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
            {articles?.attributes?.createdAt &&
                format(new Date(articles?.attributes?.createdAt), router.locale === 'ru' ? 'd MMMM yyy' : 'LLL d, yyy', { locale: router.locale === 'ru' ? ru : enUS }).toLocaleLowerCase()
            }
          </Text>
          <Text as='h2' fontSize='26px'>
            {articles?.attributes?.main_title}
          </Text>
        </Flex>
      </Wrapper>
      // <Wrapper slug={articles[0]?.attributes.slug} borderRadius='12px' _hover={{ textDecoration: 'none' }}>
      //   <Flex h='100%' direction='column' maxW='690px' w={{ '2xl': '690px', xl: '690px', lg: '95%', md: '95%' }}
      //         borderRadius='12px' bg='#F5F7FB' p='20px'>
      //     <Box borderRadius='8px' overflow='hidden'>
      //       {
      //           articles[0]?.attributes?.main_image_url &&
      //           <Image
      //               src={process.env.NEXT_PUBLIC_BASE_IMAGE_URL + articles[0]?.attributes?.main_image_url + '?resize=650x313&embed'}
      //               layout='responsive' width='650px' height='313px' objectFit='cover' alt='cover' priority/>
      //       }
      //     </Box>
      //     <Text my='16px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
      //       {articles[0]?.attributes?.createdAt &&
      //           format(new Date(articles[0]?.attributes?.createdAt), router.locale === 'ru' ? 'd MMMM yyy' : 'LLL d, yyy', { locale: router.locale === 'ru' ? ru : enUS }).toLocaleLowerCase()
      //       }
      //     </Text>
      //     <Text as='h2' fontSize='26px'>
      //       {articles[0]?.attributes?.main_title}
      //     </Text>
      //   </Flex>
      // </Wrapper>
  );
};