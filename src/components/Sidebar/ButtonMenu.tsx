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
        <MenuButton as={Button} pos='relative' display='flex' alignItems='center' justifyContent='center' bg='#ffffff'
                    border='2px solid #F5F6F8' borderRadius='50%' w='48px' minH='48px'
                    _focus={{ border: '2px solid #F5F6F8' }}>
          <Flex w='24px' pos='absolute' right='11px' top='10px'>
            <Image src={image} alt='menu'/>
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