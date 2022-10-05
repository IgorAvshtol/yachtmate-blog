import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Flex, Link, Text, Box } from '@chakra-ui/react';
import { enUS, ru } from 'date-fns/locale';

import style from 'styles/wrapper.module.css';

interface ISameArticle {
  slug: string;
  image: string;
  title: string;
  date: string;
}

export const SameArticle = ({ image, date, title, slug }: ISameArticle): JSX.Element => {
  const router = useRouter();
  const language = router.locale as string;
  const correctDate = format(new Date(date), 'LLL d, yyy', { locale: language === 'ru' ? ru : enUS });

  const [hoverCard, setHoverCard] = useState<string>('');

  const cardIsHover = () => {
    setHoverCard(slug);
  };

  const cardIsNoHover = () => {
    setHoverCard('');
  };

  return (
      <Link href={`/blog/${slug}`} display='flex' flexDirection='column' w={{ md: '330px', sm: '280px' }}
            m='20px 20px 0' zIndex='10' onMouseEnter={cardIsHover} onMouseLeave={cardIsNoHover}
            _hover={{ textDecoration: 'none' }}>
        <Flex pos='relative' w='100%' h='220px' justifyContent='center' alignItems='center' borderRadius='12px'
              overflow='hidden' className={hoverCard ? style.cardIsHover : style.card}>
          <Image src={image} layout='fill' objectFit='cover' width='330px' height='220px' alt='same-yacht'/>
        </Flex>
        <Text display={{ md: 'none', sm: 'block' }} mt='12px' fontSize='14px' lineHeight='140%' letterSpacing='0.5px'
              opacity='0.5'>
          {correctDate}
        </Text>
        <Box w={{ md: '330px', sm: '280px' }} whiteSpace='pre-line' textDecoration={hoverCard ? 'underline' : 'none'}>
          <Text mt='12px' fontSize='20px' lineHeight='148%' noOfLines={2}>{title}</Text>
        </Box>
        <Text display={{ md: 'block', sm: 'none' }} mt='12px' fontSize='14px' lineHeight='140%' letterSpacing='0.5px'
              opacity='0.5'>
          {correctDate}
        </Text>
      </Link>
  );
};