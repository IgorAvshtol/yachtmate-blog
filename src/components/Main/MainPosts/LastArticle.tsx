import Image from 'next/image';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { Box, Flex, Text } from '@chakra-ui/react';

import { useAppSelector } from 'store/store';
import { WrapperForHover } from '../../WrapperForHover';

export const LastArticle = (): JSX.Element => {
  const router = useRouter();
  const language = router.locale as string;
  const { articles } = useAppSelector(state => state.articles);

  return (
      <WrapperForHover slug={articles[0]?.attributes.slug}>
        <Flex direction='column' maxW='690px' w={{ '2xl': '690px', xl: '690px', lg: '95%', md: '95%' }}
              borderRadius='12px' bg='#F5F7FB' p='20px'>
          <Box borderRadius='8px' overflow='hidden'>
            {
                articles[0]?.attributes?.main_image_url &&
                <Image src={articles[0]?.attributes?.main_image_url} layout='responsive' width='650px' height='313px'
                       objectFit='cover' alt='cover'/>
            }
          </Box>
          <Text my='16px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
            {articles[0]?.attributes?.createdAt &&
                format(new Date(articles[0]?.attributes?.createdAt), 'LLL d, yyy', { locale: language === 'ru' ? ru : enUS })
            }
          </Text>
          <Text as='h2' fontSize='26px'>
            {articles[0]?.attributes?.main_title}
          </Text>
        </Flex>
      </WrapperForHover>
  );
};