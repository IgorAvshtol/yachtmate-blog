import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Flex, Text, Link } from '@chakra-ui/react';

import logoNew from 'public/logoNew.png';
import login from 'public/login.png';
import avatar from 'public/avatar.svg';
import bell from 'public/bell.png';
import message from 'public/message.png';
import { Menu } from './Menu';
import { SelectLang } from './SelectLang';
import { eng, rus } from 'translation';
import { useAppDispatch, useAppSelector } from 'store/store';
import { signInModalIsOpen, signUpModalIsOpen } from 'store/auth/authSlice';

export const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const { userData } = useAppSelector(state => state.auth);

  const onSignUpBtnHandler = () => {
    dispatch(signUpModalIsOpen());
  };

  const onSignInBtnHandler = () => {
    dispatch(signInModalIsOpen());
  };

  const onSearchYachtBtnClickHandler = async () => {
    await router.push(process.env.NEXT_PUBLIC_BASE_URL_FOR_MAIN_SITE as string);
  };

  return (
      <Flex w='100%' justifyContent='center' boxShadow='0px 8px 24px rgba(59, 69, 75, 0.04)'>
        <Flex h='92px' w='95%' bgColor='white' justifyContent='space-between' alignItems='center'>
          <Link href='/'>
            <Image src={logoNew} alt='logo'/>
          </Link>
          <Flex display={{ md: 'none', sm: 'block' }}>
            <Button w='79px' h='44px' borderRadius='28px' bg='rgba(0, 111, 19, 0.05)' fontSize='16px'>
              {t.header.loginBtn}
            </Button>
            <Menu/>
          </Flex>
          <Flex w='598px' justifyContent='end' display={{ md: 'flex', sm: 'none' }}>
            <Button w='147px' h='44px' paddingX='10px' borderColor='transparent' borderRadius={22} bg='#F5F6F8'
                    fontWeight='500' color='#001240' letterSpacing='0.02em' onClick={onSearchYachtBtnClickHandler}>
              {t.header.search_button}
            </Button>
            {
                userData?.email &&
                <Flex>
                  <Button justifyContent='center' alignItems='center' ml='26px' p='0' h='44px' w='44px' rounded='full'
                          bg='#F5F6F8'>
                    <Image src={bell} alt='bell'/>
                  </Button>
                  <Link href='/' mx='26px' h='44px' w='44px' rounded='full'>
                    <Image src={avatar} alt='avatar'/>
                  </Link>
                  <Button justifyContent='center' alignItems='center' mr='26px' p='0' h='44px' w='44px' rounded='full'
                          bg='#F5F6F8'>
                    <Image src={message} alt='message'/>
                  </Button>
                </Flex>
            }
            {
                !userData?.email &&
                <>
                  <Button mx='10px' display='flex' justifyContent='space-around' w='128px' h='44px' borderRadius='22px'
                          bg='#F5F6F8' onClick={onSignInBtnHandler}>
                    <Text>{t.header.loginBtn}</Text>
                    <Image src={login} width='24px' height='24px' alt='login'/>
                  </Button>
                  <Button mr='10px' h='44px' px='20px' borderRadius='22px' bg='#0250C8' textAlign='center'
                          onClick={onSignUpBtnHandler}>
                    {t.header.signUpBtn}
                  </Button>
                </>
            }
            <SelectLang/>
          </Flex>
        </Flex>
      </Flex>
  );
};