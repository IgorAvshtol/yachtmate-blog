import { Flex, Skeleton } from '@chakra-ui/react';

export const LastArticleWithSkeleton = (): JSX.Element => {
  return (
      <Flex h='100%' direction='column' maxW='690px' w={{ '2xl': '690px', xl: '690px', lg: '95%', md: '95%' }}
            borderRadius='12px' bg='#F5F7FB' p='20px'>
        <Skeleton w='100%' h='100%'/>
      </Flex>
  );
};