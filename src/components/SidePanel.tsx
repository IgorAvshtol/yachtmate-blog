import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDisclosure } from '@chakra-ui/hooks';
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Link,
  ModalCloseButton,
  Text
} from '@chakra-ui/react';

import menu from 'public/menu.png';
import menu2 from 'public/menu2.png';
import user from 'public/user.png';
import login from 'public/login.png';
import question from 'public/question.png';
import iconSearch from 'public/iconSearch.svg';
import { eng, rus } from 'translation';
import { signInModalIsOpen, signUpModalIsOpen } from 'store/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { SelectLang } from './Header/SelectLang';

export const SidePanel = (): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.auth);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const onLoginBtnClick = () => {
    dispatch(signInModalIsOpen());
  };

  const onRegisterBtnClick = () => {
    dispatch(signUpModalIsOpen());
  };

  return (
      <>
        <Button as={Button} bg='transparent' p='0' onClick={onOpen}>
          <Image src={menu2} width={24} height={24} alt='menu'/>
        </Button>
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
        >
          <DrawerOverlay/>
          <DrawerContent p='24px' pos='relative' h='100vh' justifyContent='space-between'>
            <Box>
              <ModalCloseButton mt='14px' pos='absolute' left='24px' size='sm' w='40px' h='40px' rounded='full'
                                bgColor='rgba(0, 18, 64, 0.04)'/>
              <Link href={process.env.NEXT_PUBLIC_BASE_URL_FOR_MAIN_SITE} mt='70px' bg='transparent' display='flex'
                    alignItems='center'>
                <Box h='24px' w='24px'>
                  <Image src={iconSearch} alt='search'/>
                </Box>
                <Text ml='17px' fontSize='16px'>{t.sidePanel.search}</Text>
              </Link>
              <Link href='/' mt='24px' bg='transparent' display='flex'
                    alignItems='center'>
                <Box h='24px' w='24px'>
                  <Image src={menu} alt='blog'/>
                </Box>
                <Text ml='17px' fontSize='16px'>{t.sidePanel.blog}</Text>
              </Link>
              {
                  !userData.email &&
                  <>
                    <Button mt='24px' p='0' bg='transparent' w='200px' display='flex' justifyContent='start'
                            onClick={onLoginBtnClick}>
                      <Box h='24px' w='24px'>
                        <Image src={login} alt='login'/>
                      </Box>
                      <Text ml='17px' fontSize='16px'>{t.sidePanel.signin}</Text>
                    </Button>
                    <Button mt='24px' p='0' bg='transparent' w='200px' display='flex' justifyContent='start'
                            onClick={onRegisterBtnClick}>
                      <Box h='24px' w='24px'>
                        <Image src={user} alt='signup'/>
                      </Box>
                      <Text ml='17px' fontSize='16px'>{t.sidePanel.signup}</Text>
                    </Button>
                  </>
              }
              <Divider pos='absolute' top={userData.email ? '200px' : '325px'} left='0'/>
              <Link href={process.env.NEXT_PUBLIC_BASE_URL_FOR_MAIN_SITE} mt='70px' bg='transparent' display='flex'
                    alignItems='center'>
                <Box h='24px' w='24px'>
                  <Image src={question} alt='question'/>
                </Box>
                <Text ml='17px' fontSize='16px'>{t.sidePanel.help}</Text>
              </Link>
            </Box>
            <DrawerFooter p='0' justifyContent='start'>
              <SelectLang/>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
  );
};