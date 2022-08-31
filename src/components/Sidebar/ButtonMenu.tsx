import Image, { StaticImageData } from 'next/image';
import { Menu as MainBlock } from '@chakra-ui/menu';
import { Button, Flex, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

interface IButton {
  image: StaticImageData;
  menuItems: string[];
}

export const ButtonMenu = ({ image, menuItems }: IButton): JSX.Element => {
  return (
      <MainBlock>
        <MenuButton as={Button} bg='transparent' w='48px' h='48px' border='2px solid #F5F6F8' borderRadius='50%'
                    p='5px'>
          <Flex pos='relative' justifyContent='center' color='#001240'>
            <Image src={image} alt='menu'/>
          </Flex>
        </MenuButton>
        <MenuList>
          {
            menuItems.map(item => <MenuItem key={item}>{item}</MenuItem>)
          }
        </MenuList>
      </MainBlock>
  );
};