import { useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import parse from 'html-react-parser';

import nose from 'public/nose.png';
import { SameArticles } from 'components/SameArticles/SameArticles';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { PictureAuthorsBlock } from 'components/PictureAuthorsBlock';
import { TimeBlock } from 'components/TimeBlock';
import { eng, rus } from 'translations/sixthArticle';
import { useAppContext } from 'hooks/useAppContext';

const imageAuthors = [
  { id: 1, name: 'Jayden Herr' },
];

const Sixth = (): JSX.Element => {
  const { setCurrentArticleTab } = useAppContext();
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;

  useEffect(() => {
    setCurrentArticleTab(t.sixthArticle.title);
  }, [setCurrentArticleTab, t.sixthArticle.title]);

  return (
      <>
        <Head>
          <title>{t.sixthArticle.meta_data}</title>
        </Head>
        <Flex direction='column' w='100%' alignItems='center' bg='#ffffff'>
          <Flex direction='column' mt={{ md: '65px', sm: '24px' }} mb={{ md: '64px', sm: '32px' }}
                w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
            <Sidebar/>
            <TimeBlock/>
            <Text as='h1' my='24px' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='120%'
                  letterSpacing={{ md: '1.5px', sm: '0.3px' }}>
              {t.sixthArticle.title}
            </Text>
            <Text fontSize={{ md: '24px', sm: '20px' }} lineHeight='180%'>
              {t.sixthArticle.description}
            </Text>
          </Flex>
          <Box w='100%' textAlign='center'>
            <Box w='100%' pos='relative'>
              <Image src={nose} layout='responsive' width='1440px' height='547px' alt='yacht'/>
            </Box>
          </Box>
          <Flex w='100%' direction='column' alignItems='center' bg='#E5E5E5'>
            <PictureAuthorsBlock authors={imageAuthors}/>
            <Flex direction='column' mb={{ md: '120px', sm: '80px' }}
                  w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                {t.sixthArticle.paragraphs['0'].title}
              </Text>
              <Box mt='32px'>
                {
                  t.sixthArticle.paragraphs['0'].description.map((paragraph) => (
                          paragraph &&
                          <Text key={nanoid()} fontWeight='400' fontSize={{ md: '20px', sm: '18px' }} lineHeight='180%'>
                            {paragraph}
                            <br/><br/>
                          </Text>
                      )
                  )
                }
              </Box>
              <Text as='h2' mt={{ md: '60px', sm: '36px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                {t.sixthArticle.paragraphs['1'].title}
              </Text>
              <Text mt='12px' fontWeight='400' fontSize={{ md: '20px', sm: '18px' }} lineHeight='180%'>
                {parse(t.sixthArticle.paragraphs['1'].description['0'])}
              </Text>
              <Text mt={{ md: '80px', sm: '56px' }} fontSize={{ md: '24px', sm: '20px' }}
                    lineHeight='180%'>
                {t.sixthArticle.contact_us.text}&nbsp;
                <Link color='black' textDecoration='underline' href='/'>hi@yachtmate.club</Link>
              </Text>
            </Flex>
          </Flex>
          <SameArticles currentArticleIndex={1}/>
        </Flex>
      </>
  );
};

export default Sixth;