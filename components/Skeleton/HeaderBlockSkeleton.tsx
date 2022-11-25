import { Flex, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';

import logoNew from 'public/IconLogo.svg';

export const HeaderBlockSkeleton = (): JSX.Element => {
  return (
      <Flex w='100%' justifyContent='center' boxShadow='0px 8px 24px rgba(59, 69, 75, 0.04)'>
        <Flex h={{ md: '92px', sm: '66' }} w={{ md: '95%', sm: '90%' }} bgColor='white' justifyContent='space-between'
              alignItems='center'>
          <Image src={logoNew} alt='logo'/>
          <Flex w='598px' justifyContent='end' display={{ md: 'flex', sm: 'none' }}>
            <Skeleton w='147px' h='44px' paddingX='10px' borderRadius={22}/>
            <Skeleton mx='26px' w='44px' h='44px' paddingX='10px' borderRadius={22}/>
            <Skeleton mr='10px' h='44px' w='108px' paddingX='10px' borderRadius={22}/>
          </Flex>
        </Flex>
      </Flex>
  );
};