import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Flex, Text } from '@chakra-ui/react';

import ok from 'public/ok.png';

export const RegistrationIsSuccess = (): JSX.Element => {
  const router = useRouter();

  const onEnterBtnClickHAndler = () => router.push('http://yachtmate.club/search');

  return (
      <Flex direction='column' alignItems='center'>
        <Flex justifyContent='center' alignItems='center' w='56px' h='56px' rounded='full' bg='#20B038'>
          <Image src={ok} alt='success'/>
        </Flex>
        <Text mt='32px' fontWeight='600' fontSize='32px' lineHeight='110%'>Поздравляем!</Text>
        <Text mt='32px' fontSize='16px' lineHeight='140%' letterSpacing='0.7px' color='rgba(0, 18, 64, 0.6)'
              textAlign='center'>
          Теперь у вас есть личный кабинет, чтобы начать пользоваться всеми возможностями сервиса добавьте свою лодку
        </Text>
        <Button type='submit' my='32px' w='100%' h='56px' p='20px 24px' bg='#0250C8' borderRadius='32px'
                _hover={{ bgColor: '#0250C8' }} onClick={onEnterBtnClickHAndler}>
          Add board
        </Button>
      </Flex>
  );
};