import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import parse from 'html-react-parser';

import conquering from 'public/conquering.png';
import { SameArticles } from 'components/SameArticles/SameArticles';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { PictureAuthorsBlock } from 'components/PictureAuthorsBlock';
import { TimeBlock } from 'components/TimeBlock';
import { eng, rus } from 'translations/fifthArticle';
import { useAppContext } from 'hooks/useAppContext';

const imageAuthors = [
  { id: 1, name: 'Jayden Herr' },
];

const Fifth = (): JSX.Element => {
  const { setCurrentArticleTab } = useAppContext();
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;

  useEffect(() => {
    setCurrentArticleTab(t.fifthArticle.title);
  }, [setCurrentArticleTab, t.fifthArticle.title]);

  return (
      <>
        <Head>
          <title>
            {t.fifthArticle.meta_data}
          </title>
        </Head>
        <Flex direction='column' w='100%' alignItems='center' bg='#ffffff'>
          <Flex direction='column' mt={{ md: '65px', sm: '24px' }} mb={{ md: '64px', sm: '32px' }}
                w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
            <Sidebar/>
            <TimeBlock/>
            <Text as='h1' my='24px' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='120%'
                  letterSpacing={{ md: '1.5px', sm: '0.3px' }}>
              {t.fifthArticle.title}
            </Text>
            <Text fontSize={{ md: '24px', sm: '20px' }} lineHeight='180%'>
              {t.fifthArticle.description['0']}
            </Text>
          </Flex>
          <Box w='100%' textAlign='center'>
            <Box w='100%' pos='relative'>
              <Image src={conquering} layout='responsive' width='1440px' height='547px' alt='conquering'/>
            </Box>
          </Box>
          <Flex w='100%' direction='column' alignItems='center' bg='#E5E5E5'>
            <PictureAuthorsBlock authors={imageAuthors}/>
            <Flex direction='column' mb={{ md: '120px', sm: '80px' }}
                  w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
              <Text mt={{ md: '56px', sm: '40px' }} fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.fifthArticle.paragraphs['0'].description['0']}
              </Text>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                {t.fifthArticle.paragraphs['1'].title}
              </Text>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.fifthArticle.paragraphs['1'].description['0']}
                <br/><br/>
                {t.fifthArticle.paragraphs['1'].description['1']}
                <br/><br/>
                {t.fifthArticle.paragraphs['1'].description['2']}
              </Text>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                {t.fifthArticle.paragraphs['2'].title}
              </Text>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.fifthArticle.paragraphs['2'].description['0']}
                <br/><br/>
                {t.fifthArticle.paragraphs['2'].description['1']}
              </Text>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                {t.fifthArticle.paragraphs['3'].title}
              </Text>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.fifthArticle.paragraphs['3'].description['0']}
                <br/><br/>
                {t.fifthArticle.paragraphs['3'].description['1']}
                <br/><br/>
                {t.fifthArticle.paragraphs['3'].description['2']}
              </Text>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                {t.fifthArticle.paragraphs['4'].title}
              </Text>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.fifthArticle.paragraphs['4'].description['0']}
              </Text>
              <Text mt='80px' fontWeight='400' fontSize={{ md: '24px', sm: '20px' }} lineHeight='180%'>
                {parse(t.fifthArticle.paragraphs['5'].description['0'])}
              </Text>
              <Text mt='60px' fontWeight='400' fontSize={{ md: '24px', sm: '20px' }} lineHeight='180%'>
                {t.fifthArticle.paragraphs.contact_us.text}&nbsp;
                <Link color='black' textDecoration='underline' href='/'>hi@yachtmate.club</Link>
              </Text>
            </Flex>
          </Flex>
          <SameArticles currentArticleIndex={4}/>
        </Flex>
      </>
  );
};

export default Fifth;