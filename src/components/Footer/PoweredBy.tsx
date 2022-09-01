import { Divider, Link, Text, Flex } from '@chakra-ui/react';

export const PoweredBy = (): JSX.Element => {
  return (
      <Flex direction='column' w='100%' alignItems='center'>
        <Divider/>
        <Text w='300px' textAlign='center' as='h2' mt='24px' fontSize='16px' lineHeight='140%'
              color='rgba(255, 255, 255, 0.75)'>
          © 2022, yachtmate. All rights reserved. Powered by&nbsp;
          <Link color='white' textDecoration='underline' href='https://meow-code.come'>meow-code.com</Link>
        </Text>
      </Flex>
  );
};