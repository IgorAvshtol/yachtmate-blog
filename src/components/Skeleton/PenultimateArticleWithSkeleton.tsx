import { Flex, Skeleton } from '@chakra-ui/react';

export const PenultimateArticleWithSkeleton = (): JSX.Element => {
  return (
      <Flex mt={{ md: '0', sm: '12px' }} w={{ md: '330px', sm: '100%' }} direction='column' bg='#F5F7FB'
            borderRadius='12px' p='20px' h='100%'>
        <Skeleton w='100%' h='100%'/>
      </Flex>
  );
};