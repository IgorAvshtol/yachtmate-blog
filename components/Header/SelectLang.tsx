import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';

import globe from 'public/globe.svg';
import englandFlag from 'public/IconFlagEngland.svg';
import russiaFlag from 'public/IconFlagRussia.svg';
import dropdown from 'public/dropdown.svg';

export const SelectLang = (): JSX.Element => {
  const router = useRouter();
  const [dropDown, setDropDown] = useState<boolean>(false);

  const onLanguageToggleClick = async (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    await router.push(`${router.asPath}`, `${router.asPath}`, { locale: e.currentTarget.value });
    localStorage.setItem('current_language', (router.locale as string));
    setDropDown(!dropDown);
  };

  const onSelectClickHandler = () => {
    setDropDown(!dropDown);
  };

  return (
      <Menu>
        <MenuButton as={Button} w='107px' h='44px' px='10px' border='3px solid' borderColor='#F5F6F8'
                    borderRadius='28px' onClick={onSelectClickHandler}
                    bg='#ffffff' color='#001240' _focus={{ bg: '#ffffff' }} _hover={{ bg: '#ffffff' }}>
          <Flex justifyContent='space-between' alignItems='center'>
            <Image src={globe} alt='glob'/>
            <Text>{router.locale === 'en' ? 'Eng' : 'Ru'}</Text>
            <Flex transform={dropDown ? 'rotate(0deg)' : 'rotate(180deg)'} transition='.4s all'>
              <Image src={dropdown} alt='dropDown'/>
            </Flex>
          </Flex>
        </MenuButton>
        <MenuList w='215px' borderRadius='10px' p='0'>
          <MenuItem minH='48px' pl='24px' value='en' onClick={onLanguageToggleClick}>
            <Image src={englandFlag} alt='eng'/>
            <Text ml='10px'>English</Text>
          </MenuItem>
          <MenuItem minH='48px' pl='24px' value='ru' onClick={onLanguageToggleClick}>
            <Image src={russiaFlag} alt='rus'/>
            <Text ml='10px'>Русский</Text>
          </MenuItem>
        </MenuList>
      </Menu>
  );
};