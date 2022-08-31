import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

import yacht from 'public/yacht.png';
import { SameArticles } from 'components/SameArticles/SameArticles';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { PictureAuthorsBlock } from 'components/PictureAuthorsBlock';
import { TimeBlock } from 'components/TimeBlock';
import { eng, rus } from 'translations/firstArticle';

const imageAuthors = [
  { id: 1, name: 'Chris Yacubovich' },
];

const First = (): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;

  return (
      <>
        <Head>
          <title>
            {t.firstArticle.meta_data}
          </title>
        </Head>
        <Flex direction='column' w='100%' alignItems='center' bg='#ffffff'>
          <Flex direction='column' mt={{ md: '65px', sm: '24px' }} mb={{ md: '64px', sm: '32px' }}
                w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
            <Sidebar/>
            <TimeBlock/>
            <Text as='h1' my='24px' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='140%'
                  letterSpacing={{ md: '1.5px', sm: '0.3px' }}>
              {t.firstArticle.title}
            </Text>
            <Text fontSize={{ md: '24px', sm: '20px' }} color='#001240' lineHeight='180%'>
              {t.firstArticle.description['0']}
            </Text>
            <br/><br/>
            <Text fontSize={{ md: '24px', sm: '20px' }} color='#001240' lineHeight='180%'>
              {t.firstArticle.description['1']}
            </Text>
          </Flex>
          <Box w='100%' textAlign='center'>
            <Box w='100%' pos='relative'>
              <Image src={yacht} layout='responsive' alt='yacht'/>
            </Box>
          </Box>
          <Flex direction='column' alignItems='center' w='100%' bg='#E5E5E5'>
            <PictureAuthorsBlock authors={imageAuthors}/>
            <Flex direction='column' mb={{ md: '64px', sm: '32px' }}
                  w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
              <Text as='h2' mt='80px' fontWeight='600' fontSize='32px' lineHeight='140%' letterSpacing='0.3px'>
                {t.firstArticle.paragraphs['0'].title}
              </Text>
              <Text mt='12px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.firstArticle.paragraphs['0'].description['0']}
                <br/><br/>
                {t.firstArticle.paragraphs['0'].description['1']}
              </Text>
              <Text as='h2' mt='80px' fontWeight='600' fontSize='32px' lineHeight='140%' letterSpacing='0.3px'>
                {t.firstArticle.paragraphs['1'].title}
              </Text>
              <Text mt='12px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.firstArticle.paragraphs['1'].description['0']}
                <br/><br/>
                {t.firstArticle.paragraphs['1'].description['1']}
              </Text>
              <Text as='h2' mt='80px' fontWeight='600' fontSize='32px' lineHeight='140%' letterSpacing='0.3px'>
                {t.firstArticle.paragraphs['2'].title}
              </Text>
              <Text mt='12px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.firstArticle.paragraphs['2'].description['0']}
              </Text>
              <Text mt='80px' fontWeight='400' fontSize={{ md: '24px', sm: '20px' }} lineHeight='180%'>
                {parse(t.firstArticle.paragraphs['3'].description)}
              </Text>
              <Text mt='60px' fontWeight='400' fontSize={{ md: '24px', sm: '20px' }} lineHeight='180%'>
                {t.firstArticle.contact_us.text}&nbsp;
                <Link color='black' textDecoration='underline' href='/'>hi@yachtmate.club</Link>
              </Text>
            </Flex>

          </Flex>
          <SameArticles/>
        </Flex>
      </>
  );
};

export default First;