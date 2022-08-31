import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Flex, Text } from '@chakra-ui/react';

import cormack from 'public/cormack.png';
import sameYacht from 'public/yacht.png';
import style from './MainPosts.module.css';
import { eng, rus } from 'translations/firstArticle';
import { eng as en, rus as ru } from 'translations/translation';
import { AccessibilityLink } from '../../AccessibilityLink';
import { useAppContext } from 'hooks/useAppContext';

export const MainPosts = (): JSX.Element => {
  const { currentLanguage, setCurrentArticleTab } = useAppContext();
  const router = useRouter();
  const t = router.locale === 'en' || currentLanguage === 'en' ? eng : rus;
  const tr = router.locale === 'en' || currentLanguage === 'en' ? en : ru;

  const onPostClickHandler = async (slug: string, title: string) => {
    setCurrentArticleTab(title);
    await router.push({
      pathname: `/blog/${slug}`
    });
  };

  return (
      <Flex direction='column' mb={{ md: '124px', sm: '24px' }} w={{ lg: '75%', md: '80%', sm: '90%' }}>
        <Text as='h1' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='120%'
              letterSpacing={{ md: '1.5px', sm: '0.3px' }}>
          {tr.main_title}
        </Text>
        <Flex mt={{ md: '40px', sm: '24px' }} justifyContent='space-between' flexDir={{ md: 'row', sm: 'column' }}>
          <Flex direction='column' maxW='690px' w={{ xl: '690px', lg: '50%', md: '50%' }} borderRadius='12px'
                bg='#F5F7FB' p='20px'>
            <Box borderRadius='8px' overflow='hidden'>
              <Image src={cormack} alt='yacht' layout='responsive' objectFit='cover' width='650px' height='313px'
                     className={style.img}/>
            </Box>
            <Text my='16px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
              {tr.main_posts.date}
            </Text>
            <Text as='h2' fontSize='26px' lineHeight='140%' _hover={{ textDecoration: 'underline' }}
                  onClick={() => onPostClickHandler('boats-vs-yachts-is-there-any-difference', 'Boats vs Yachts: Is There Any Difference?')}>
              <AccessibilityLink to='blog/boats-vs-yachts-is-there-any-difference'>
                Boats vs Yachts: Is There Any Difference?
              </AccessibilityLink>
            </Text>
          </Flex>
          <Flex mt={{ md: '0', sm: '12px' }} w={{ md: '330px', sm: '100%' }} direction='column'
                bg='#F5F7FB' borderRadius='12px' p='20px'>
            <Box borderRadius='8px' overflow='hidden'>
              <Image src={sameYacht} alt='cover' layout='responsive' width='290px' height='192px' objectFit='cover'/>
            </Box>
            <Text my='16px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
              {tr.main_posts.date}
            </Text>
            <Text as='h2' fontSize='20px' lineHeight='140%' _hover={{ textDecoration: 'underline' }}
                  onClick={() => onPostClickHandler('3-common-boating-safety-myths', `${t.firstArticle.title}`)}
            >
              <AccessibilityLink to='blog/3-common-boating-safety-myths'>
                {t.firstArticle.title}
              </AccessibilityLink>
            </Text>
            <Text as='h3' mt='10px' fontWeight='400' fontSize='18px' opacity='0.6' lineHeight='140%' noOfLines={3}>
              {t.firstArticle.description['0']}
            </Text>
          </Flex>
        </Flex>
      </Flex>
  );
};