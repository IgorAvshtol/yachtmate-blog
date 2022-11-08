import { Flex, Spinner as Circle } from '@chakra-ui/react';

export const Spinner = (): JSX.Element => {
  return (
      <Flex mt='20px' w='100%' justifyContent='center'>
        <Flex w='56px' h='56px' justifyContent='center' alignItems='center' bg='#0250C8' rounded='full'>
          <Circle
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='lg'
          />
        </Flex>
      </Flex>
  );
};