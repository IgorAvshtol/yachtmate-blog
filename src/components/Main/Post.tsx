import Image from 'next/image';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { Box, Text } from '@chakra-ui/react';

import { WrapperForHover } from '../WrapperForHover';

interface IPost {
  slug: string;
  title: string;
  image: string;
  date: string;
  lang: string;
}

export const Post = ({ image, title, date, slug, lang }: IPost): JSX.Element => {
  const correctDate = format(new Date(date), 'LLL d, yyy', { locale: lang === 'ru' ? ru : enUS });

  return (
      <Box h='max-content' p='20px' bg='white' borderRadius='12px' _even={{ xl: { mt: '30px' }, sm: { mt: '0' } }}
           _odd={{ xl: { mt: '-200px' }, sm: { mt: '0' } }} _hover={{ boxShadow: 'md', cursor: 'pointer' }}>
        <WrapperForHover slug={slug}>
          <Box borderRadius='8px' overflow='hidden'>
            <Image src={image} objectFit='cover' layout='responsive' width='400px' height='226px' alt='postCover'/>
          </Box>
          <Text mt='20px' mb='12px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
            {correctDate}
          </Text>
          <Text as='h2' fontSize={{ md: '26px', sm: '20px' }}>
            {title}
          </Text>
        </WrapperForHover>
      </Box>
  );
};
