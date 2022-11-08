import { useRouter } from 'next/router';
import { Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

import { eng, rus } from 'translation';

interface ITimeBlock {
  createdAt: string;
  time_to_read: string;
}

export const TimeBlock = ({ time_to_read, createdAt }: ITimeBlock): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;

  return (
      <Flex fontWeight='500' fontSize='16px' color='#001240' lineHeight='180%' opacity='0.5'>
        <Text display={{ md: 'block', sm: 'none' }}>
          {createdAt && format(new Date(createdAt), router.locale === 'ru' ? 'd MMMM yyy' : 'd MMM yyy', { locale: router.locale === 'ru' ? ru : enUS }).toLocaleLowerCase()}
        </Text>
        <Text display={{ md: 'none', sm: 'block' }}>
          {createdAt && format(new Date(createdAt), router.locale === 'ru' ? 'd MMM yyy' : 'd MMM yyy', { locale: router.locale === 'ru' ? ru : enUS }).toLocaleLowerCase()}
        </Text>
        <Text mx='15px'>·</Text>
        <Text>{time_to_read} {t.generalArticlesData.time_for_reading}</Text>
      </Flex>
  );
};