import { Flex, Text, Link } from '@chakra-ui/react';

export const PrivacyAndConditions = (): JSX.Element => {
  return (
      <Flex mt='25px' w='100%' justifyContent='center' fontSize='12px' lineHeight='20px' color='#00124099'>
        <Link href='#' textDecoration='underline'>Privacy Policy</Link>
        <Text mx='3px'>and</Text>
        <Link href='#' textDecoration='underline'>Terms of Use</Link>
      </Flex>
  );
};