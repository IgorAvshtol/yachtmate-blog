import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Fade, Flex, Link, Text } from '@chakra-ui/react';

import iconHome from 'public/iconHome.svg';
import iconSearch from 'public/iconSearch.svg';
import avatar from 'public/avatar.svg';
import login from 'public/profile.png';
import blackHeart from 'public/blackHeart.svg';
import { useAppDispatch, useAppSelector } from 'store/store';
import { addYachtModalIsOpen, signInModalIsOpen } from 'store/auth/authSlice';
import { eng, rus } from 'translation';

export const SidebarDown = (): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.auth);
  const [purpose, setPurpose] = useState(false);

  const onLoginBtnClick = () => {
    dispatch(signInModalIsOpen());
  };

  const onSearchYachtBtnClickHandler = async () => {
    if (userData?.email && userData?.yacht_name) {
      await router.push(router.locale === 'en' ? process.env.NEXT_PUBLIC_BASE_URL_FOR_MAIN_SITE as string : process.env.NEXT_PUBLIC_BASE_URL_FOR_MAIN_SITE_RU as string);
    } else if (userData?.email && !userData?.yacht_name) {
      dispatch(addYachtModalIsOpen());
    } else if (!userData?.email) {
      dispatch(signInModalIsOpen());
    }
  };

  useEffect(() => {
    let oldValue = 0;
    let newValue = 0;
    window.addEventListener('scroll', function () {
      newValue = window.scrollY;
      if (oldValue - newValue < 0) {
        setPurpose(true);
      } else if (oldValue - newValue > 0) {
        setPurpose(false);
      }
      oldValue = newValue;
    });
  }, []);

  return (
      <Fade in={!purpose}>
        <Flex display={{ md: 'none', sm: 'flex' }} w='100%' justifyContent='center' pos='fixed'
              left='0' bottom='0' zIndex='20' bg='#ffffff' boxShadow='0px -8px 24px rgba(59, 69, 75, 0.04)'>
          <Flex w='95%' h='60px' justifyContent='space-around' alignItems='center'>
            <Link href='/pages' bg='transparent' display='flex' flexDirection='column' alignItems='center'>
              <Image src={iconHome} alt='home'/>
              <Text mt='2px' fontSize='10px'>{t.sidebar.home}</Text>
            </Link>
            <Link onClick={onSearchYachtBtnClickHandler}
                bg='transparent' display='flex'
                flexDirection='column' alignItems='center'>
              <Image src={iconSearch} alt='search'/>
              <Text mt='2px' fontSize='10px'>{t.sidebar.search}</Text>
            </Link>
            <Link
                href={router.locale === 'en' ? process.env.NEXT_PUBLIC_BASE_URL_FOR_FAVORITE_YACHTS : process.env.NEXT_PUBLIC_BASE_URL_FOR_FAVORITE_YACHTS_RU}
                bg='transparent' display='flex'
                flexDirection='column' alignItems='center'>
              <Image src={blackHeart} alt='favorite'/>
              <Text mt='2px' fontSize='10px'>{t.sidebar.favorite}</Text>
            </Link>
            {
              userData.email
                  ? <Link
                      href={router.locale === 'en' ? process.env.NEXT_PUBLIC_BASE_URL_FOR_PERSONAL_CABINET : process.env.NEXT_PUBLIC_BASE_URL_FOR_PERSONAL_CABINET_RU}
                      bg='transparent' display='flex'
                      flexDirection='column' alignItems='center'>
                    <Image src={userData?.photo || avatar} width='24px' height='24px' alt='avatar'/>
                    <Text mt='2px' fontSize='10px'>{t.sidebar.profile}</Text>
                  </Link>
                  : <Button p='0' bg='transparent' display='flex' flexDirection='column' alignItems='center'
                            onClick={onLoginBtnClick}>
                    <Image src={login} width='24px' height='24px' alt='singin'/>
                    <Text mt='2px' fontSize='10px'>{t.login_modal.title}</Text>
                  </Button>
            }
          </Flex>
        </Flex>
      </Fade>

  );
};