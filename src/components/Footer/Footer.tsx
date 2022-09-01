import { Box, Flex, Link, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import waveUp from 'public/waveUp.svg';
import waveDown from 'public/waveDown.svg';
import yachtmateLogo from 'public/yachtmateLogo.png';
import facebookLogo from 'public/facebookLogo.png';
import instagramLogo from 'public/instagramLogo.png';
import youtubeLogo from 'public/youtubeLogo.png';
import { ResponseImage } from '../ResponseImage';
import { PoweredBy } from './PoweredBy';
import { eng, rus } from 'translations/translation';
import { useAppContext } from 'hooks/useAppContext';

export const Footer = (): JSX.Element => {
  const router = useRouter();
  const { currentLanguage } = useAppContext();

  const slug = router.pathname.slice(1, router.pathname.length);

  const t = router.locale === 'en' || currentLanguage === 'en' ? eng : rus;

  return (
      <Flex direction='column' alignItems='center' w='100%' pos='relative'
            bg={slug ? '#ffffff' : '#E5E5E5'}>
        <Flex w='100%' h={{ '2xl': '760px', md: '560px', sm: '570px' }} pos='relative' justifyContent='center'>
          <Box zIndex='1'>
            <Image src={waveDown} layout='fill' objectFit='cover' alt='wave-cover'/>
          </Box>
          <Box minW='100%' h='300px' pos='absolute' top='0' opacity='0.63'>
            <Image src={waveUp} layout='fill' objectFit='cover' alt='wave-cover'/>
          </Box>
          <Flex mt={{ md: '123px', sm: '100px' }} w={{ md: '55%', sm: '75%' }} h='330px' alignItems='start' zIndex='2'
                direction={{ md: 'row', sm: 'column' }} justifyContent='space-between'>
            <Flex direction='column' w={{ md: '330px', sm: '100%' }} alignItems={{ md: 'start', sm: 'center' }}>
              <Box w='165px' h='40px' pos='relative'>
                <Image src={yachtmateLogo} alt='logo' objectFit='cover' layout='fill'/>
              </Box>
              <Text as='h2' mt='32px' w={{ md: '330px', sm: '100%' }} fontSize='16px' opacity='0.8'
                    textAlign={{ md: 'start', sm: 'center' }} lineHeight='140%'
                    bg='linear-gradient(180deg, #FFFFFF -9.09%, rgba(255, 255, 255, 0) 274.43%)' bgClip='text'>
                {t.footer}
              </Text>
              <Link href='/' _hover={{ textDecoration: 'none' }}>
                <Text as='h2' mt={{ md: '56px', sm: '30px' }} fontSize='24px' lineHeight='148%' color='white'
                      opacity='0.4'>
                  support@yachtmate.club
                </Text>
              </Link>
            </Flex>
            <Flex mt={{ md: '0', sm: '48px' }} w='100%' justifyContent={{ md: 'end', sm: 'center' }}>
              <ResponseImage src={facebookLogo} alt='facebook' w='40px' h='40px'/>
              <ResponseImage src={instagramLogo} alt='instagram' mx='20px' w='40px' h='40px'/>
              <ResponseImage src={youtubeLogo} alt='youtube' w='40px' h='40px'/>
            </Flex>
            <Box w='100%' mt='40px' textAlign='center' display={{ md: 'none', sm: 'block' }}>
              <PoweredBy/>
            </Box>
          </Flex>
          <Box display={{ md: 'block', sm: 'none' }} w='55%' mt='40px' pos='absolute' bottom='40px' textAlign='center'
               zIndex='10'>
            <PoweredBy/>
          </Box>
        </Flex>
      </Flex>
  );
};