import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

import waveUp from 'public/waveUp.svg';
import waveDown from 'public/waveDown.svg';
import yachtmateLogo from 'public/yachtmateLogo.png';
import { PoweredBy } from './PoweredBy';
import { eng, rus } from 'translation';

export const Footer = (): JSX.Element => {
  const router = useRouter();
  const slug = router.pathname.slice(1, router.pathname.length);
  const t = router.locale === 'en' ? eng : rus;

  return (
      <Flex alignItems='center' w='100%' pos='relative' bg={slug ? '#ffffff' : '#F5F7FB'}>
        <Flex direction='column' w='100%' h={{ '2xl': '760px', sm: '750px' }} pos='relative' justifyContent='center'
              alignItems='center'>
          <Box zIndex='1'>
            <Image src={waveDown} layout='fill' objectFit='cover' alt='wave-cover'/>
          </Box>
          <Box minW='100%' h='300px' pos='absolute' top='0' opacity='0.63'>
            <Image src={waveUp} layout='fill' objectFit='cover' alt='wave-cover'/>
          </Box>
          <Flex mt={{ md: '123px', sm: '100px' }} w={{ lg: '55%', md: '65%', sm: '75%' }}
                alignItems={{ lg: 'start', sm: 'center' }} zIndex='2'
                direction={{ md: 'row', sm: 'column' }} justifyContent='space-between'>
            <Flex direction='column' w={{ md: '330px', sm: '100%' }} alignItems={{ md: 'start', sm: 'center' }}>
              <Box w='165px' h='40px' pos='relative'>
                <Image src={yachtmateLogo} alt='logo' objectFit='cover' layout='fill'/>
              </Box>
              <Text as='h2' mt='32px' w={{ md: '330px', sm: '100%' }} fontSize='16px' opacity='0.8'
                    textAlign={{ md: 'start', sm: 'center' }} lineHeight='140%'
                    bg='linear-gradient(180deg, #FFFFFF -9.09%, rgba(255, 255, 255, 0) 274.43%)' bgClip='text'>
                {t.footer.description}
              </Text>
            </Flex>
            <Flex w={{ lg: '50%', md: '30%', sm: '100%' }} mt={{ md: '5px', sm: '56px' }}
                  direction={{ lg: 'row', sm: 'column' }} justifyContent='space-between'
                  textAlign={{ md: 'left', sm: 'center' }}>
              <Flex direction='column' alignItems={{ md: 'start', sm: 'center' }}>
                <Link
                    href={router.locale === 'en' ? process.env.NEXT_PUBLIC_BASE_URL_FOR_MAIN_SITE : process.env.NEXT_PUBLIC_BASE_URL_FOR_MAIN_SITE_RU}
                    _hover={{ textDecoration: 'none' }}>
                  <Text as='h2' fontSize='20px' lineHeight='148%' color='white'>
                    {t.footer.yacht_search}
                  </Text>
                </Link>
                <Link href={router.locale === 'en' ? process.env.NEXT_PUBLIC_BASE_URL_FOR_YACHT_CLUB_PAGE : process.env.NEXT_PUBLIC_BASE_URL_FOR_YACHT_CLUB_PAGE_RU}
                      _hover={{ textDecoration: 'none' }}>
                  <Text w='190px' mt='16px' as='h2' fontSize='20px' lineHeight='148%' color='white'>
                    {t.footer.yacht_club}
                  </Text>
                </Link>
              </Flex>
              <Link
                  href={router.locale === 'en' ? process.env.NEXT_PUBLIC_BASE_URL_FOR_HOME_PAGE : process.env.NEXT_PUBLIC_BASE_URL_FOR_HOME_PAGE_RU}
                  _hover={{ textDecoration: 'none' }} mt={{ lg: '0', sm: '16px' }}>
                <Text as='h2' fontSize='20px' lineHeight='148%' color='white'>
                  {t.footer.support}
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Box w={{ lg: '55%', md: '65%', sm: '75%' }} mt={{ md: '320px', sm: '0' }} mb={{ md: '0', sm: '10px' }}
               textAlign='center' zIndex='10'>
            <PoweredBy/>
          </Box>
        </Flex>
      </Flex>
  );
};