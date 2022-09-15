import { ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Flex, Select } from '@chakra-ui/react';

import globe from 'public/globe.svg';

export const SelectLang = (): JSX.Element => {
  const router = useRouter();

  const handleLanguageToggle = async (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.currentTarget.value) {
      case 'en':
        await router.push(`${router.asPath}`, `${router.asPath}`, { locale: 'en' });
        break;
      case 'ru':
        await router.push(`${router.asPath}`, `${router.asPath}`, { locale: 'ru' });
        break;
    }
  };

  return (
      <Flex w='107px' h='44px' border='3px solid' borderColor='#F5F6F8' borderRadius='28px' justifyContent='center'
            alignItems='center'>
        <Box ml='10px' mt='5px'>
          <Image src={globe} width='20px' height='20px' alt='world-cover'/>
        </Box>
        <Select border='none' ml='-10px' maxW='max-content' _active={{ outline: 'none' }}
                _focus={{ boxShadow: 'none' }} onChange={handleLanguageToggle} value={router.locale}>
          <option value='en'>Eng</option>
          <option value='ru'>Ru</option>
        </Select>
      </Flex>
  );
};