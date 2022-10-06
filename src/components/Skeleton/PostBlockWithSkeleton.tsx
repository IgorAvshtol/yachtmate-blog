import { Skeleton } from '@chakra-ui/react';

export const PostBlockWithSkeleton = (): JSX.Element => {
  return (
      <Skeleton w='100%' h='440px' p='20px' bg='white' borderRadius='12px'
                _even={{ xl: { mt: '30px' }, sm: { mt: '0' } }} _odd={{ xl: { mt: '-200px' }, sm: { mt: '0' } }}
                _hover={{ boxShadow: 'md', cursor: 'pointer' }}>
      </Skeleton>
  );
};
