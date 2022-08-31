import { Box, Flex, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import parse from 'html-react-parser';

import missouri from 'public/missouri.png';
import california from 'public/california.png';
import washington from 'public/washington.png';
import lighthouse from 'public/lighthouse.png';
import preview from 'public/preview.png';
import { SameArticles } from 'components/SameArticles/SameArticles';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { PictureAuthorsBlock } from 'components/PictureAuthorsBlock';
import { TimeBlock } from 'components/TimeBlock';
import { eng, rus } from 'translations/thirdArticle';

const imageAuthors = [
  { id: 1, name: 'Jayden Herr' },
  { id: 2, name: 'Daniel Guerra' },
  { id: 3, name: 'Jayden Herr' },
  { id: 4, name: 'Rusty Watson' },
];

const Third = (): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;

  return (
      <>
        <Head>
          <title>
            {t.thirdArticle.meta_data}
          </title>
        </Head>
        <Flex direction='column' w='100%' alignItems='center' bg='#ffffff'>
          <Flex direction='column' mt={{ md: '65px', sm: '24px' }} mb={{ md: '120px', sm: '80px' }}
                w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
            <Sidebar/>
            <TimeBlock/>
            <Text as='h1' my='24px' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='140%'
                  letterSpacing={{ md: '1.5px', sm: '0.3px' }}>
              {t.thirdArticle.title}
            </Text>
            <Text fontSize={{ md: '24px', sm: '20px' }} lineHeight='180%'>
              {t.thirdArticle.description['0']}
            </Text>
          </Flex>
          <Box w='100%' pos='relative'>
            <Image src={preview} layout='responsive' alt='yacht'/>
          </Box>
          <Flex direction='column' alignItems='center' bg='#E5E5E5'>
            <Flex direction='column' mb={{ md: '120px', sm: '80px' }}
                  w={{ xl: '40%', lg: '55%', md: '80%', sm: '90%' }}>
              <PictureAuthorsBlock authors={imageAuthors}/>
              <Text as='h2' mt={{ md: '80px', sm: '40px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                {t.thirdArticle.paragraphs['0'].title}
              </Text>
              <Box mt='32px' w='100%' pos='relative'>
                <Image src={missouri} layout='responsive' width={800} height={420} alt='missouri'/>
              </Box>
              <PictureAuthorsBlock authors={[{ id: 1, name: 'Daniel Guerra' }]}/>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.thirdArticle.paragraphs['0'].description['0']}
              </Text>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                {t.thirdArticle.paragraphs['1'].title}
              </Text>
              <Box mt='32px' w='100%' pos='relative'>
                <Image src={california} layout='responsive' width={800} height={520} alt='california'/>
              </Box>
              <PictureAuthorsBlock authors={[{ id: 1, name: 'Daniel Guerra' }]}/>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.thirdArticle.paragraphs['1'].description['0']}
              </Text>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                {t.thirdArticle.paragraphs['2'].title}
              </Text>
              <Box mt='32px' w='100%' pos='relative'>
                <Image src={washington} layout='responsive' width={800} height={440} alt='washington'/>
              </Box>
              <PictureAuthorsBlock authors={[{ id: 1, name: 'Benjamin Massello' }]}/>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.thirdArticle.paragraphs['2'].description['0']}
              </Text>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                {t.thirdArticle.paragraphs['3'].title}
              </Text>
              <Box mt='32px' w='100%' pos='relative'>
                <Image src={lighthouse} layout='responsive' width={800} height={440} alt='lighthouse'/>
              </Box>
              <PictureAuthorsBlock authors={[{ id: 1, name: 'Rusty Watson' }]}/>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                {t.thirdArticle.paragraphs['3'].description['0']}
              </Text>
              <Text mt='80px' fontWeight='400' fontSize='24px' lineHeight='180%'>
                {parse(t.thirdArticle.paragraphs['4'].description['0'])}
              </Text>
              {
                  t.thirdArticle.paragraphs['5'].description['0'] &&
                  <Text mt='60px' fontWeight='400' fontSize='24px' lineHeight='180%'>
                    {parse(t.thirdArticle.paragraphs['5'].description['0'])}
                  </Text>
              }
              <Text mt='60px' fontWeight='400' fontSize='24px' lineHeight='180%'>
                {t.thirdArticle.paragraphs.contact_us.text}&nbsp;
                <Link color='black' textDecoration='underline'
                      href='/'>hi@yachtmate.club</Link>
              </Text>
            </Flex>
          </Flex>
          <SameArticles/>
        </Flex>
      </>
  );
};

export default Third;