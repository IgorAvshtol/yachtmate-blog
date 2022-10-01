import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

import { MainPosts } from './MainPosts/MainPosts';
import { Posts } from './Posts';
import { auth } from 'store/auth/authThunk';
import { useAppDispatch } from 'store/store';

export const Main = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
      <Flex direction='column' alignItems='center' w='100%' mt={{ md: '65px', sm: '24px' }}>
        <MainPosts/>
        <Posts/>
      </Flex>
  );
};