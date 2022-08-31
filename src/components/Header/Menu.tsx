import Image from 'next/image';
import { Button, Menu as MainBlock, MenuButton, MenuItem, MenuList, } from '@chakra-ui/react';

import menuLogo from 'public/menu.png';

export const Menu = (): JSX.Element => {
  return (
      <MainBlock>
        <MenuButton as={Button} bg='transparent'>
          <Image src={menuLogo} width={24} height={24} alt='menu'/>
        </MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </MainBlock>
  );
};