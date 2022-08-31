import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Flex, Select } from '@chakra-ui/react';

import globe from 'public/globe.svg';
import { getLangFromLocalStorage, setLangFromLocalStorage } from 'services/localStorage';
import { useAppContext } from 'hooks/useAppContext';

export const SelectLang = (): JSX.Element => {
  const [lang, setLang] = useState<string>(getLangFromLocalStorage());
  const { setCurrentLanguage } = useAppContext();
  const router = useRouter();

  const handleLanguageToggle = (e: ChangeEvent<HTMLSelectElement>) => {
    switch (e.currentTarget.value) {
      case 'en':
        router.push(`${router.pathname}`, `${router.pathname}`, { locale: 'en' });
        setLangFromLocalStorage('en');
        setLang('en');
        setCurrentLanguage('en');
        break;
      case 'ru':
        router.push(`${router.pathname}`, `${router.pathname}`, { locale: 'ru' });
        setLangFromLocalStorage('ru');
        setLang('ru');
        setCurrentLanguage('ru');
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
                _focus={{ boxShadow: 'none' }} onChange={handleLanguageToggle} value={lang}>
          <option value='en'>Eng</option>
          <option value='ru'>Ru</option>
        </Select>
      </Flex>
  );
};