import Image from 'next/image';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { Box, Flex, Text } from '@chakra-ui/react';

import { useAppSelector } from 'store/store';
import { Wrapper } from '../../Wrapper';
import { TypeLoadingStatus } from 'interfaces';
import { PenultimateArticleWithSkeleton } from '../../Skeleton/PenultimateArticleWithSkeleton';

export const PenultimateArticle = (): JSX.Element => {
  const router = useRouter();
  const language = router.locale as string;
  const { articles, loading } = useAppSelector(state => state.articles);
  const indexOfPenultimateArticle = articles.length - 2;

  if (loading === TypeLoadingStatus.IS_PENDING) return <PenultimateArticleWithSkeleton/>;

  return (
      <Wrapper slug={articles[indexOfPenultimateArticle]?.attributes?.slug} borderRadius='12px'
               _hover={{ textDecoration: 'none' }}>
        <Flex mt={{ md: '0', sm: '12px' }} w={{ md: '330px', sm: '100%' }} direction='column' bg='#F5F7FB'
              borderRadius='12px' p='20px' h='100%'>
          <Box borderRadius='8px' overflow='hidden'>
            {
                articles[indexOfPenultimateArticle]?.attributes?.main_image_url &&
                <Image src={articles[indexOfPenultimateArticle]?.attributes?.main_image_url} alt='cover' layout='responsive'
                       width='290px' height='192px' objectFit='cover'/>
            }
          </Box>
          <Text my='16px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
            {
                articles[indexOfPenultimateArticle]?.attributes?.createdAt &&
                format(new Date(articles[indexOfPenultimateArticle]?.attributes?.createdAt), 'LLL d, yyy', { locale: language === 'ru' ? ru : enUS })
            }
          </Text>
          <Text as='h2' fontSize='20px'>{articles[indexOfPenultimateArticle]?.attributes?.main_title}</Text>
          <Text as='h3' mt='8px' fontWeight='400' fontSize='18px' opacity='0.6' noOfLines={3}>
            {articles[indexOfPenultimateArticle]?.attributes?.main_description}
          </Text>
        </Flex>
      </Wrapper>
  );
};