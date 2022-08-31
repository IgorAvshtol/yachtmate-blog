import { useRouter } from 'next/router';
import { Flex, Text } from '@chakra-ui/react';

import { eng, rus } from 'translations/translation';
import { useAppContext } from 'hooks/useAppContext';

export const TimeBlock = (): JSX.Element => {
  const { currentLanguage } = useAppContext();
  const router = useRouter();
  const t = router.locale === 'en' || currentLanguage === 'en' ? eng : rus;

  return (
      <Flex fontWeight='500' fontSize='16px' color='#001240' lineHeight='180%' opacity='0.5'>
        <Text>2 {t.generalArticlesData.date} 2022</Text>
        <Text mx='15px'>·</Text>
        <Text>5 {t.generalArticlesData.time_for_reading}</Text>
      </Flex>
  );
};