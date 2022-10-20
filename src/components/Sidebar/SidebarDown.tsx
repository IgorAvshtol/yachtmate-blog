import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Fade, Flex, Link, Text } from '@chakra-ui/react';

import like from 'public/like.png';
import iconHome from 'public/iconHome.svg';
import iconSearch from 'public/iconSearch.svg';
import avatar from 'public/avatar.svg';
import login from 'public/profile.png';
import blackHeart from 'public/blackHeart.svg';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setLike, setUnlike } from 'store/atricles/articlesThunk';
import { eng, rus } from 'translation';
import { signInModalIsOpen } from 'store/auth/authSlice';

export const SidebarDown = (): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.auth);
  const { currentArticle: data } = useAppSelector(state => state.articles);
  const [purpose, setPurpose] = useState(false);

  const arrayOfLikes = data?.attributes?.hasLiked;

  const listenScrollEvent = (e: any) => {
    const delta = Math.sign(e.deltaY);
    if (delta === 1) {
      setPurpose(true);
    } else {
      setPurpose(false);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', listenScrollEvent);
    return () => window.removeEventListener('wheel', listenScrollEvent);
  }, []);

  const onLikeClickHandler = () => {
    const likeData = {
      articleId: data?.id,
      userId: userData?._id
    };
    if (arrayOfLikes?.includes(userData._id)) {
      dispatch(setUnlike(likeData));
    } else {
      userData._id && dispatch(setLike(likeData));
    }
  };

  const onLoginBtnClick = () => {
    dispatch(signInModalIsOpen());
  };

  return (
      <Fade in={!purpose}>
        <Flex display={{ md: 'none', sm: 'flex' }} w='100%' justifyContent='center' pos='fixed'
              left='0' bottom='0' zIndex='20' bg='#ffffff' boxShadow='0px -8px 24px rgba(59, 69, 75, 0.04)'>
          <Flex w='95%' h='60px' justifyContent='space-around' alignItems='center'>
            <Link href='/' bg='transparent' display='flex' flexDirection='column' alignItems='center'>
              <Image src={iconHome} alt='home'/>
              <Text mt='2px' fontSize='10px'>{t.sidebar.home}</Text>
            </Link>
            <Link href={process.env.NEXT_PUBLIC_BASE_URL_FOR_MAIN_SITE} bg='transparent' display='flex'
                  flexDirection='column' alignItems='center'>
              <Image src={iconSearch} alt='search'/>
              <Text mt='2px' fontSize='10px'>{t.sidebar.search}</Text>
            </Link>
            <Button bg='transparent' display='flex' flexDirection='column' alignItems='center'
                    onClick={onLikeClickHandler}>
              <Image src={arrayOfLikes?.includes(userData._id) ? like : blackHeart} alt='like'/>
              <Text mt='4px' fontSize='10px'>{arrayOfLikes?.length}</Text>
            </Button>
            {
              userData.email
                  ? <Link href={process.env.NEXT_PUBLIC_BASE_URL_FOR_PERSONAL_CABINET} bg='transparent' display='flex'
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