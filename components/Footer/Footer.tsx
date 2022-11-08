import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

import waveUp from 'public/waveUp.svg';
import waveDown from 'public/waveDown.svg';
import yachtmateLogo from 'public/yachtmateLogo.png';
import facebookLogo from 'public/facebookLogo.png';
import instagramLogo from 'public/instagramLogo.png';
import { PoweredBy } from './PoweredBy';
import { eng, rus } from 'translation';

export const Footer = (): JSX.Element => {
  const router = useRouter();
  const slug = router.pathname.slice(1, router.pathname.length);
  const t = router.locale === 'en' ? eng : rus;

  return (
      <Flex direction='column' alignItems='center' w='100%' pos='relative' bg={slug ? '#ffffff' : '#F5F7FB'}>
        <Flex w='100%' h={{ '2xl': '760px', md: '600px', sm: '570px' }} pos='relative' justifyContent='center'>
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
              <Link href='/pages' _hover={{ textDecoration: 'none' }}>
                <Text as='h2' mt={{ md: '56px', sm: '30px' }} fontSize='24px' lineHeight='148%' color='white'
                      opacity='0.4'>
                  support@yachtmate.club
                </Text>
              </Link>
            </Flex>
            <Flex mt={{ md: '0', sm: '48px' }} w='100%' justifyContent={{ md: 'end', sm: 'center' }}>
              <Link href={process.env.NEXT_PUBLIC_BASE_URL_FOR_FACEBOOK} rel='nofollow noindex' target='blank' w='40px'
                    h='40px'>
                <Image src={facebookLogo} alt='facebook-logo'/>
              </Link>
              <Link href={process.env.NEXT_PUBLIC_BASE_URL_FOR_INSTAGRAM} rel='nofollow noindex' target='blank' w='40px'
                    h='40px' ml='20px'>
                <Image src={instagramLogo} alt='instagram-logo'/>
              </Link>
            </Flex>
            <Box mt='40px' textAlign='center' display={{ md: 'none', sm: 'block' }} w='100%'>
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