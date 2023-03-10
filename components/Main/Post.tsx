import Image from 'next/image';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { Box, Text } from '@chakra-ui/react';

import { Wrapper } from '../Wrapper';

interface IPost {
  slug: string;
  title: string;
  image: string;
  date: string;
  lang: string;
}

export const Post = ({ image, title, date, slug, lang }: IPost): JSX.Element => {
  const correctDate = format(new Date(date), lang === 'en' ? 'LLL d, yyy' : 'd MMMM yyy', { locale: lang === 'ru' ? ru : enUS }).toLocaleLowerCase();

  return (
      <Wrapper slug={slug} h={'max-content'} p={'20px'} bg={'white'} borderRadius={'12px'}
               _even={{ xl: { mt: '30px' }, sm: { mt: '0' } }} _odd={{ xl: { mt: '-200px' }, sm: { mt: '0' } }}
               _hover={{ boxShadow: 'md', cursor: 'pointer' }}>
        <Box borderRadius='8px' overflow='hidden'>
          <Image src={image + '?resize=400x226&embed'} objectFit='cover' layout='responsive' width='400px'
                 height='226px' alt='postCover' priority/>
        </Box>
        <Text mt='20px' mb='12px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
          {correctDate}
        </Text>
        <Text as='h2' fontSize={{ md: '26px', sm: '20px' }}>
          {title}
        </Text>
      </Wrapper>
  );
};
