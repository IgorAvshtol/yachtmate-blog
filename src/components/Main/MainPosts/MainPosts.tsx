import Image from 'next/image';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

import style from './MainPosts.module.css';
import { useAppSelector } from 'store/store';
import { eng, rus } from 'translation';

export const MainPosts = (): JSX.Element => {
  const router = useRouter();
  const language = router.locale as string;
  const { articles } = useAppSelector(state => state.articles);
  const indexOfLastArticle = articles.length - 1;
  const t = router.locale === 'en' ? eng : rus;

  return (
      <Flex direction='column' mb={{ md: '124px', sm: '24px' }} maxW='1100px' w={{ lg: '75%', md: '85%', sm: '90%' }}>
        <Text as='h1' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='120%'
              letterSpacing={{ md: '1.5px', sm: '0.3px' }}>
          {t.main_title}
        </Text>
        <Flex mt={{ md: '40px', sm: '24px' }} justifyContent='space-between' flexDir={{ md: 'row', sm: 'column' }}>
          <Flex direction='column' maxW='690px' w={{ xl: '690px', lg: '50%', md: '50%' }} borderRadius='12px'
                bg='#F5F7FB' p='20px'>
            <Box borderRadius='8px' overflow='hidden'>
              {
                  articles[0]?.attributes?.main_image.url &&
                  <Image src={articles[0]?.attributes?.main_image.url} layout='responsive' width='650px' height='313px'
                         objectFit='cover' alt='cover' className={style.img}/>
              }
            </Box>
            <Text my='16px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
              {articles[0]?.attributes?.createdAt &&
                  format(new Date(articles[0]?.attributes?.createdAt), 'LLL d, yyy', { locale: language === 'ru' ? ru : enUS })
              }
            </Text>
            <Link href={`${language}/blog/${articles[0]?.attributes.slug}`}>
              <Text as='h2' fontSize='26px'>
                {articles[0]?.attributes?.main_title}
              </Text>
            </Link>
          </Flex>
          <Flex mt={{ md: '0', sm: '12px' }} w={{ md: '330px', sm: '100%' }} direction='column'
                bg='#F5F7FB' borderRadius='12px' p='20px'>
            <Box w='100%' borderRadius='8px' overflow='hidden'>
              {articles[indexOfLastArticle]?.attributes?.main_image.url &&
                  <Image src={articles[indexOfLastArticle]?.attributes?.main_image.url} alt='cover' layout='responsive'
                         width='290px' height='192px' objectFit='cover'/>
              }
            </Box>
            <Text my='16px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
              {articles[indexOfLastArticle]?.attributes?.createdAt &&
                  format(new Date(articles[indexOfLastArticle]?.attributes?.createdAt), 'LLL d, yyy', { locale: language === 'ru' ? ru : enUS })}
            </Text>
            <Link href={`${language}/blog/${articles[indexOfLastArticle]?.attributes.slug}`}>
              <Text as='h2' fontSize='20px'>
                {articles[indexOfLastArticle]?.attributes?.main_title}
              </Text>
            </Link>
            <Text as='h3' mt='8px' fontWeight='400' fontSize='18px' opacity='0.6' noOfLines={3}>
              {articles[indexOfLastArticle]?.attributes?.main_description[0][0]}
            </Text>
          </Flex>
        </Flex>
      </Flex>
  );
};