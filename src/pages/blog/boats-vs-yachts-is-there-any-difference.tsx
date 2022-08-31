import { useEffect } from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Head from 'next/head';

import cormack from 'public/cormack.png';
import { SameArticles } from 'components/SameArticles/SameArticles';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { PictureAuthorsBlock } from 'components/PictureAuthorsBlock';
import { TimeBlock } from 'components/TimeBlock';
import { useAppContext } from 'hooks/useAppContext';

const imageAuthors = [
  { id: 1, name: 'Jayden Herr' },
];

const Fourth = (): JSX.Element => {
  const { setCurrentArticleTab } = useAppContext();

  useEffect(() => {
    setCurrentArticleTab('Boats vs Yachts: Is There Any Difference');
  }, [setCurrentArticleTab]);

  return (
      <>
        <Head>
          <title>
            People often use the words ‘boat’ and ‘yacht’ interchangeably, but what is the difference between the two?
            Here is a yacht owner’s take from Yachtmateclub.
          </title>
        </Head>
        <Flex direction='column' w='100%' alignItems='center' bg='#ffffff'>
          <Flex direction='column' mt={{ md: '65px', sm: '24px' }} mb={{ md: '64px', sm: '32px' }}
                w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
            <Sidebar/>
            <TimeBlock/>
            <Text as='h1' my='24px' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='140%'
                  letterSpacing={{ md: '1.5px', sm: '0.3px' }}>
              Boats vs Yachts: Is There Any Difference?
            </Text>
            <Text fontSize={{ md: '24px', sm: '20px' }} lineHeight='180%'>
              What is a yacht, and what is a boat? Is there a difference between the two? According to google search
              engine statistics, these questions are among the most popular search requests when it comes to boating.
            </Text>
          </Flex>
          <Box w='100%' textAlign='center'>
            <Box w='100%' pos='relative'>
              <Image src={cormack} layout='responsive' width='1440px' height='547px' alt='cormack'/>
            </Box>
          </Box>
          <Flex w='100%' direction='column' alignItems='center' bg='#E5E5E5'>
            <PictureAuthorsBlock authors={imageAuthors}/>
            <Flex direction='column' mb={{ md: '120px', sm: '80px' }}
                  w={{ xl: '800px', lg: '55%', md: '80%', sm: '90%' }}>
              <Text mt={{ md: '56px', sm: '40px' }} fontWeight='400' fontSize='20px' lineHeight='180%'>
                Every year, boating lovers from all over the world flock to San Diego. It is a great place to get out on
                the water and enjoy different types of boats, including yachts, catamarans, racing boats and others. The
                city’s temperate climate and steady winds make it an ideal destination for comfortable water travel.
                This
                is a place of breath-taking sunsets, sandy beaches of the Pacific Ocean and rich marine life. Here you
                can
                even have a unique experience of scuba diving and whale watching.
              </Text>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                Size
              </Text>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                The first thing that comes to mind is size. When you think about yachts, most likely you don’t imagine a
                small 5-meter-long (15 feet) vessel. Yachts are expensive recreational crafts, which are obviously
                bigger than regular boats. The smallest yachts are at least around 10 meters (35 feet) in length, while
                so-called ‘superyachts’ can reach up to 30 meters (100 feet).
                Small boats are usually operated by one captain, but because of their size, yachts require a bigger
                crew. Yacht owners often employ professionals to navigate their craft, as there are many different
                important tasks, which can’t be managed by only one captain. These include maintenance of deck
                equipment, watchkeeping, overseeing the vessel’s mechanical and electrical systems as well as many
                others.
              </Text>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                Technology
              </Text>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                Unlike most regular boats, yachts are equipped with advanced propulsion and marine electronics. These
                systems ensure smooth and comfortable sailing, especially during trans-oceanic trips. Yachts are
                designed to go into the open ocean, which requires a precise navigation system. This includes a GPS, a
                chart plotter, a marine radar and other devices that help captains determine the exact location and
                direction of a yacht.
              </Text>
              <Text as='h2' mt={{ md: '80px', sm: '56px' }} fontWeight='600' fontSize='32px' lineHeight='140%'
                    letterSpacing='0.3px'>
                Operation
              </Text>
              <Text mt='32px' fontWeight='400' fontSize='20px' lineHeight='180%'>
                Yachts are a luxury, so by definition their main purpose is leisure. Often beautifully designed and
                equipped with entertainment facilities, they bring their owners aesthetic pleasure and a convenient
                sailing experience. Moreover, yachts can go into the open ocean for long voyages and withstand rough
                waves and winds, while smaller boats are suitable only for more shallow and calm waters.
              </Text>
              <Text mt='80px' fontWeight='400' fontSize='24px' lineHeight='180%'>
                Yachtmateclub is the world’s first boat sharing platform that allows boat and yacht owners to explore
                waters around the globe and connect with other captains for free.
                <Link color='black' textDecoration='underline'
                      href='/'>Register</Link> to&nbsp;to join the
                community of
                passionate boating enthusiasts and find a boat in desired areas now.
                <br/><br/>
                Want to know more? Don’t hesitate to connect with us at&nbsp;
                <Link color='black' textDecoration='underline'
                      href='/'>hi@yachtmate.club</Link>
              </Text>
            </Flex>
          </Flex>
          <SameArticles currentArticleIndex={3}/>
        </Flex>
      </>
  );
};

export default Fourth;