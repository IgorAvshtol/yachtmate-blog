import { Flex, Text, Link } from '@chakra-ui/react';

import { eng, rus } from 'translation';
import { useAppSelector } from 'store/store';

export const PrivacyAndConditions = (): JSX.Element => {
  const { currentLanguage } = useAppSelector(state => state.articles);
  const t = currentLanguage === 'en' ? eng : rus;

  return (
      <Flex mt='25px' w='100%' justifyContent='center' fontSize='12px' lineHeight='20px' color='#00124099'>
        <Link href='#' textDecoration='underline'>{t.privacy.policy}</Link>
        <Text mx='3px'>{t.privacy.and}</Text>
        <Link href='#' textDecoration='underline'>{t.privacy.terms}</Link>
      </Flex>
  );
};