import { Flex, Grid } from '@chakra-ui/react';

import { PostBlockWithSkeleton } from './PostBlockWithSkeleton';

const mockPostsArray = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

export const PostsPageWithSkeleton = (): JSX.Element => {
  return (
      <Flex justifyContent='center' w='100%' py={{ md: '60px', sm: '40px' }} bg='#F5F7FB' pos='relative'>
        <Flex w={{ xl: '980px', lg: '70%', md: '70%' }} direction='column' alignItems='center' bg='#F5F7FB'>
          <Grid w='100%' mt={{ xl: '280px', md: '80px', sm: '30px' }} justifyContent='space-around'
                templateColumns='repeat(auto-fill, minmax(365px, 440px))' gap={{ xl: '100px', md: '50px', sm: '12px' }}>
            {
              mockPostsArray.map(post => <PostBlockWithSkeleton key={post.id}/>)
            }
          </Grid>
        </Flex>
      </Flex>
  );
};