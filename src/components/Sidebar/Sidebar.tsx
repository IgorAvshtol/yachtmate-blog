import Image from 'next/image';
import { Button, Flex, Text } from '@chakra-ui/react';

import more from 'public/more.png';
import share from 'public/share.png';
import heart from 'public/heart.png';
import { ButtonMenu } from './ButtonMenu';

const sideBarData = [
  { id: 1, items: ['Delete', 'Edit'], image: more },
  { id: 2, items: ['vk', 'instagram'], image: share },
];

export const Sidebar = (): JSX.Element => {
  return (
      <Flex w={{ md: 'auto', sm: '90%' }} justifyContent={{ md: 'end', sm: 'center' }} pos='fixed'
            right={{ md: '50px' }} zIndex='10' top={{ md: '190px' }} bottom={{ sm: '-40px' }}>
        <Flex direction={{ md: 'column', sm: 'row' }} w={{ md: '50px', sm: '180px' }} h='180px'
              justifyContent='space-between' alignItems='center'>
          {
            sideBarData.map(data => <ButtonMenu key={data.id} image={data.image} menuItems={data.items}/>)
          }
          <Flex direction={{ md: 'column', sm: 'row' }} alignItems='center'>
            <Button bg='transparent' w='48px' h='48px' border='2px solid #F5F6F8' borderRadius='50%' p='5px'>
              <Flex pos='relative' color='#001240'>
                <Image src={heart} alt='menu'/>
              </Flex>
            </Button>
            <Text ml={{ md: '0', sm: '10px' }} fontSize='16px' color='#777E90'>3</Text>
          </Flex>
        </Flex>
      </Flex>
  );
};