import Image from 'next/image';
import { Button, Flex, Text } from '@chakra-ui/react';

import more from 'public/more.png';
import share from 'public/share.png';
import like from 'public/like.png';
import dislike from 'public/heart.png';
import { ButtonMenu } from './ButtonMenu';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setLike, setUnlike } from 'store/atricles/articlesThunk';

const sideBarData = [
  { id: 1, items: ['Delete', 'Edit'], image: share, label: 'Share' },
  { id: 2, items: ['vk', 'instagram'], image: more, label: 'Other' },
];

export const SidebarDown = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.auth);
  const { currentArticle: data } = useAppSelector(state => state.articles);

  const arrayOfLikes = data?.attributes?.hasLiked;

  const onLikeClickHandler = () => {
    if (arrayOfLikes?.includes(userData.id)) {
      dispatch(setUnlike(data?.id));
    } else {
      dispatch(setLike(data?.id));
    }
  };

  return (
      <Flex display={{ md: 'none', sm: 'flex' }} w='100%' justifyContent='center' pos='fixed' bottom='0' zIndex='20'
            bg='#ffffff'>
        <Flex w='100%' h='90px' justifyContent='space-around' alignItems='center'>
          <Flex h='90px' w='80px' direction='column' alignItems='center' justifyContent='center'>
            <Button bg='transparent' w='48px' h='48px' border='2px solid #F5F6F8' borderRadius='50%' p='5px'
                    onClick={onLikeClickHandler}>
              <Image src={arrayOfLikes?.includes(userData.id) ? like : dislike} alt='menu'/>
            </Button>
            <Text mt='2px' fontSize='16px' opacity='0.5'>{arrayOfLikes?.length}</Text>
          </Flex>

          {
            sideBarData.map(data => <ButtonMenu key={data.id} image={data.image} menuItems={data.items}
                                                label={data.label}/>
            )
          }
        </Flex>
      </Flex>
  );
};