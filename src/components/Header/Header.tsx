import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Flex, Input, Link, Text } from '@chakra-ui/react';

import logo from 'public/logo.png';
import logoTitle from 'public/logoTitle.png';
import login from 'public/login.png';
import { Menu } from './Menu';
import { SelectLang } from './SelectLang';
import { eng, rus } from 'translations/translation';
import { useAppContext } from 'hooks/useAppContext';

export const Header = (): JSX.Element => {
  const { currentLanguage } = useAppContext();
  const router = useRouter();
  const t = router.locale === 'en' || currentLanguage === 'en' ? eng : rus;

  return (
      <Flex w='100%' justifyContent='center' boxShadow='0px 8px 24px rgba(59, 69, 75, 0.04)'>
        <Flex h='92px' w='95%' bgColor='white' justifyContent='space-between' alignItems='center'>
          <Flex mb='5px' w='160px' justifyContent='space-between' alignItems='center'>
            <Image src={logo} width='40px' height='40px' alt='logo'/>
            <Link href='/' mt='10px'>
              <Image src={logoTitle} width='110px' height='20px' alt='logo'/>
            </Link>
          </Flex>
          <Flex display={{ md: 'none', sm: 'block' }}>
            <Button w='79px' h='44px' borderRadius='28px' bg='rgba(0, 111, 19, 0.05)' fontSize='16px'>
              {t.header.loginBtn}
            </Button>
            <Menu/>
          </Flex>
          <Flex w='498px' justifyContent='space-between' display={{ md: 'flex', sm: 'none' }}>
            <Input placeholder={t.header.input_placeholder} w='147px' h='44px' paddingX='10px' borderColor='transparent'
                   borderRadius={22} bg='#F5F6F8' fontWeight='500' color='#001240' letterSpacing='0.02em'
                   textAlign='center' _placeholder={{ color: '#001240' }}/>
            <Button display='flex' justifyContent='space-around' w='128px' h='44px' borderRadius='22px' bg='#F5F6F8'>
              <Text>{t.header.loginBtn}</Text>
              <Image src={login} width='24px' height='24px' alt='login'/>
            </Button>
            <Button w='80px' h='44px' borderRadius='22px' bg='#0250C8' textAlign='center'>Join</Button>
            <SelectLang/>
          </Flex>
        </Flex>
      </Flex>
  );
};