import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Menu as MainBlock, MenuButton, MenuItem, MenuList, } from '@chakra-ui/react';

import menuLogo from 'public/menu.png';

export const Menu = (): JSX.Element => {
  const router = useRouter();

  const handleLanguageToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    switch (e.currentTarget.textContent) {
      case 'en':
        await router.push(`${router.asPath}`, `${router.asPath}`, { locale: 'en' });
        break;
      case 'ru':
        await router.push(`${router.asPath}`, `${router.asPath}`, { locale: 'ru' });
        break;
    }
  };

  return (
      <MainBlock>
        <MenuButton as={Button} bg='transparent'>
          <Image src={menuLogo} width={24} height={24} alt='menu'/>
        </MenuButton>
        <MenuList minW='0' w='50px'>
          <MenuItem onClick={handleLanguageToggle}>en</MenuItem>
          <MenuItem onClick={handleLanguageToggle}>ru</MenuItem>
        </MenuList>
      </MainBlock>
  );
};