import { Divider, Flex, Link, Text } from '@chakra-ui/react';

export const PoweredBy = (): JSX.Element => {
  return (
      <Flex w='100%' direction='column' alignItems='center'>
        <Divider/>
        <Text as='h2' w='300px' mt='24px' fontSize='16px' lineHeight='140%' color='rgba(255, 255, 255, 0.75)'>
          © 2022, yachtmate. All rights reserved. Powered by&nbsp;
          <Link color='white' textDecoration='underline' href='https://meow-code.come'>meow-code.com</Link>
        </Text>
      </Flex>
  );
};