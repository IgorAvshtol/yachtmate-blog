import Image from 'next/image';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { Box, Flex, Text } from '@chakra-ui/react';

import { useAppSelector } from 'store/store';
import { Wrapper } from '../../Wrapper';
import { IArticlesDataForSSR, TypeLoadingStatus } from 'interfaces';
import { PenultimateArticleWithSkeleton } from '../../Skeleton/PenultimateArticleWithSkeleton';

export const PenultimateArticle = ({ articles }: IArticlesDataForSSR): JSX.Element => {
  const router = useRouter();
  const { loading } = useAppSelector(state => state.articles);
  const penultimateArticle = articles[articles?.length - 2];

  const previewDescription = penultimateArticle?.attributes?.main_description.split('<p>')[1];

  if (loading === TypeLoadingStatus.IS_PENDING) return <PenultimateArticleWithSkeleton/>;

  return (
      <Wrapper slug={penultimateArticle?.attributes?.slug} borderRadius='12px' _hover={{ textDecoration: 'none' }}>
        <Flex mt={{ md: '0', sm: '12px' }} w={{ md: '330px', sm: '100%' }} direction='column' bg='#F5F7FB'
              borderRadius='12px' p='20px' h='100%'>
          <Box borderRadius='8px' overflow='hidden'>
            {
                penultimateArticle?.attributes?.main_image_url &&
                <Image
                    src={process.env.NEXT_PUBLIC_BASE_IMAGE_URL + penultimateArticle?.attributes?.main_image_url + '?resize=290x192&embed'}
                    alt='cover' layout='responsive' width='290px' height='192px' objectFit='cover' priority/>
            }
          </Box>
          <Text my='16px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
            {
                penultimateArticle?.attributes?.createdAt &&
                format(new Date(penultimateArticle?.attributes?.createdAt), router.locale === 'ru' ? 'd MMMM yyy' : 'LLL d, yyy', { locale: router.locale === 'ru' ? ru : enUS }).toLocaleLowerCase()
            }
          </Text>
          <Text as='h2' fontSize='20px'>{articles[1]?.attributes?.main_title}</Text>
          <Text as='h3' mt='8px' fontWeight='400' fontSize='18px' opacity='0.6' noOfLines={3}
                dangerouslySetInnerHTML={{ __html: previewDescription }}/>
        </Flex>
      </Wrapper>
  );
};