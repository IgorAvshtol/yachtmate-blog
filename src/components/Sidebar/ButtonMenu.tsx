import Image, { StaticImageData } from 'next/image';
import { Button, Flex, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { Menu as MainBlock } from '@chakra-ui/menu';

interface IButton {
  image: StaticImageData;
  label?: string;
  menuItems: string[];
}

export const ButtonMenu = ({ image, menuItems, label }: IButton): JSX.Element => {
  return (
      <MainBlock>
        <MenuButton as={Button} justifyContent='space-between' alignItems='center' bg='transparent' h='90px'>
          <Flex pos='relative' alignItems='center' justifyContent='center' color='#001240' w='48px' h='48px'
                border='2px solid #F5F6F8' borderRadius='50%'>
            <Flex>
              <Image src={image} alt='menu'/>
            </Flex>
          </Flex>
          <Text mt='5px' fontSize='16px' opacity='0.5'>{label}</Text>
        </MenuButton>
        <MenuList>
          {
            menuItems.map(item => <MenuItem key={item}>{item}</MenuItem>)
          }
        </MenuList>
      </MainBlock>
  );
};