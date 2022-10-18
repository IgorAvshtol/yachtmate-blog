import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, Flex, Link, Text } from '@chakra-ui/react';

import like from 'public/like.png';
import iconHome from 'public/iconHome.svg';
import iconSearch from 'public/iconSearch.svg';
import avatar from 'public/avatar.svg';
import blackHeart from 'public/blackHeart.svg';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setLike, setUnlike } from 'store/atricles/articlesThunk';
import { eng, rus } from 'translation';

export const SidebarDown = (): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.auth);
  const { currentArticle: data } = useAppSelector(state => state.articles);

  const arrayOfLikes = data?.attributes?.hasLiked;

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

  return (
      <Flex display={{ md: 'none', sm: 'flex' }} w='100%' justifyContent='center' pos='fixed' left='0' bottom='0'
            zIndex='20' bg='#ffffff'>
        <Flex w='100%' h='50px' justifyContent='space-around' alignItems='center'>
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
          <Link href={process.env.NEXT_PUBLIC_BASE_URL_FOR_PERSONAL_CABINET} bg='transparent' display='flex'
                flexDirection='column' alignItems='center'>
            <Image src={userData?.photo || avatar} width='24px' height='24px' alt='avatar'/>
            <Text mt='2px' fontSize='10px'>{t.sidebar.profile}</Text>
          </Link>
        </Flex>
      </Flex>
  );
};