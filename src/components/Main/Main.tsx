import { Flex } from '@chakra-ui/react';

import { MainPosts } from './MainPosts/MainPosts';
import { Posts } from './Posts';

export const Main = ({articles}:any): JSX.Element => {
  return (
      <Flex direction='column' alignItems='center' w='100%' mt={{ md: '65px', sm: '24px' }}>
        <MainPosts articles={articles}/>
        <Posts/>
      </Flex>
  );
};