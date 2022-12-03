import Image from 'next/image';
import { Divider, Flex, Link, Text } from '@chakra-ui/react';

import facebookLogo from 'public/facebookLogo.png';
import instagramLogo from 'public/instagramLogo.png';

export const PoweredBy = (): JSX.Element => {
  return (
      <Flex w='100%' direction='column' alignItems='center'>
        <Divider display={{ md: 'block', sm: 'none' }}/>
        <Flex w='100%' direction={{ md: 'row', sm: 'column-reverse' }} justifyContent='center' alignItems='center'>
          <Flex direction='column' textAlign='left'>
            <Text as='h2' w='300px' mt='32px' fontSize='16px' lineHeight='140%' color='rgba(255, 255, 255, 0.75)'>
              © 2022, yachtmate. All rights reserved.
            </Text>
            <Text as='h2' w='300px' fontSize='16px' lineHeight='140%' color='rgba(255, 255, 255, 0.75)'
                  textAlign={{ md: 'left', sm: 'center' }}>
              Powered by&nbsp;
              <Link color='white' textDecoration='underline' href='https://meow-code.com'>almo</Link>
            </Text>
          </Flex>
          <Flex mt={{ md: '32px', sm: '56px' }} w='100%' direction={{ md: 'row', sm: 'column' }}
                justifyContent={{ md: 'end', sm: 'center' }}>
            <Flex justifyContent='center'>
              <Link href={process.env.NEXT_PUBLIC_BASE_URL_FOR_FACEBOOK} rel='nofollow noindex' target='blank' w='40px'
                    h='40px'>
                <Image src={facebookLogo} alt='facebook-logo'/>
              </Link>
              <Link href={process.env.NEXT_PUBLIC_BASE_URL_FOR_INSTAGRAM} rel='nofollow noindex' target='blank' w='40px'
                    h='40px' ml='20px'>
                <Image src={instagramLogo} alt='instagram-logo'/>
              </Link>
            </Flex>
            <Divider display={{ md: 'none', sm: 'block' }} mt='56px'/>
          </Flex>
        </Flex>
      </Flex>
  );
};