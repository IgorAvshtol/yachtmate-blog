import Image from 'next/image';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { Box, Flex, Text } from '@chakra-ui/react';

import { useAppSelector } from 'store/store';
import { Wrapper } from '../../Wrapper';
import { TypeLoadingStatus } from 'interfaces';
import { LastArticleWithSkeleton } from '../../Skeleton/LastArticleWithSkeleton';

export const LastArticle = (): JSX.Element => {
  const router = useRouter();
  const language = router.locale as string;
  const { articles, loading } = useAppSelector(state => state.articles);
  const indexOfLastArticle = articles.length - 1;

  if (loading === TypeLoadingStatus.IS_PENDING) return <LastArticleWithSkeleton/>;

  return (
      <Wrapper slug={articles[indexOfLastArticle]?.attributes.slug} borderRadius='12px'
               _hover={{ textDecoration: 'none' }}>
        <Flex h='100%' direction='column' maxW='690px' w={{ '2xl': '690px', xl: '690px', lg: '95%', md: '95%' }}
              borderRadius='12px' bg='#F5F7FB' p='20px'>
          <Box borderRadius='8px' overflow='hidden'>
            {
                articles[indexOfLastArticle]?.attributes?.main_image_url &&
                <Image src={articles[indexOfLastArticle]?.attributes?.main_image_url} layout='responsive' width='650px'
                       height='313px'
                       objectFit='cover' alt='cover'/>
            }
          </Box>
          <Text my='16px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
            {articles[indexOfLastArticle]?.attributes?.createdAt &&
                format(new Date(articles[indexOfLastArticle]?.attributes?.createdAt), 'LLL d, yyy', { locale: language === 'ru' ? ru : enUS })
            }
          </Text>
          <Text as='h2' fontSize='26px'>
            {articles[indexOfLastArticle]?.attributes?.main_title}
          </Text>
        </Flex>
      </Wrapper>
  );
};