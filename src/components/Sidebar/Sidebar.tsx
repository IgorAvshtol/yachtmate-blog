import Image from 'next/image';
import { Button, Flex, Text } from '@chakra-ui/react';

import more from 'public/more.png';
import share from 'public/share.png';
import dislike from 'public/heart.png';
import like from 'public/like.png';
import { ButtonMenu } from './ButtonMenu';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setLike, setUnlike } from 'store/atricles/articlesThunk';

const sideBarData = [
  { id: 1, items: ['Delete', 'Edit'], image: more },
  { id: 2, items: ['vk', 'instagram'], image: share },
];

export const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.auth);
  const { currentArticle: data } = useAppSelector(state => state.articles);

  const arrayOfLikes = data?.attributes?.hasLiked;

  const onLikeClickHandler = () => {
    const likeData = {
      articleId: data?.id,
      userId: userData?.id
    };
    if (arrayOfLikes?.includes(userData?.id)) {
      dispatch(setUnlike(likeData));
    } else {
      dispatch(setLike(likeData));
    }
  };

  return (
      <Flex display={{ md: 'flex', sm: 'none' }} w='90%' justifyContent='end' pos='fixed' right='50px' zIndex='10'
            top='190px'>
        <Flex direction='column' w='50px' h='180px' justifyContent='space-between' alignItems='center'>
          {
            sideBarData.map(data => <ButtonMenu key={data.id} image={data.image} menuItems={data.items}/>)
          }
          <Flex direction='column' alignItems='center'>
            <Button bg='transparent' w='48px' h='48px' border='2px solid #F5F6F8' borderRadius='50%' p='5px'>
              <Flex pos='relative' color='#001240' onClick={onLikeClickHandler}>
                <Image src={arrayOfLikes?.includes(userData.id) ? like : dislike} alt='like'/>
              </Flex>
            </Button>
            <Text fontSize='16px' color='#777E90'>{arrayOfLikes?.length}</Text>
          </Flex>
        </Flex>
      </Flex>
  );
};