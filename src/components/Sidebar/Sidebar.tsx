import Image from 'next/image';
import { Button, Flex, Skeleton, Text } from '@chakra-ui/react';

import share from 'public/share.png';
import dislike from 'public/heart.png';
import like from 'public/like.png';
import { ButtonMenu } from './ButtonMenu';
import { useAppDispatch, useAppSelector } from 'store/store';
import { setLike, setUnlike } from 'store/atricles/articlesThunk';
import { TypeLoadingStatus } from 'interfaces';

const sideBarData = [
  { id: 2, items: ['vk', 'instagram'], image: share },
];

export const Sidebar = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(state => state.auth);
  const { currentArticle: data, loading } = useAppSelector(state => state.articles);

  const arrayOfLikes = data?.attributes?.hasLiked;

  const onLikeClickHandler = () => {
    const likeData = {
      articleId: data?.id,
      userId: userData?._id
    };
    if (arrayOfLikes?.includes(userData?._id)) {
      dispatch(setUnlike(likeData));
    } else {
      dispatch(setLike(likeData));
    }
  };

  return (
      <Flex display={{ md: 'flex', sm: 'none' }} w='90%' justifyContent='end' pos='fixed' right='50px' zIndex='10'
            top='290px'>
        <Flex direction='column' h='100px' justifyContent='space-between' alignItems='center'>
          {
            sideBarData.map(data => <ButtonMenu key={data.id} image={data.image} menuItems={data.items}/>)
          }
          <Flex mt='10px' direction='column' alignItems='center'>
            <Button w='48px' h='48px' border='2px solid #F5F6F8' bg='#ffffff' borderRadius='50%' p='5px'>
              <Flex pos='relative' color='#001240' onClick={onLikeClickHandler}>
                <Image src={arrayOfLikes?.includes(userData._id) ? like : dislike} alt='like'/>
              </Flex>
            </Button>
            {loading === TypeLoadingStatus.IS_PENDING && <Skeleton mt='5px' w='20px' h='20px'/>}
            <Text fontSize='16px' color='#777E90'>{arrayOfLikes?.length}</Text>
          </Flex>
        </Flex>
      </Flex>
  );
};