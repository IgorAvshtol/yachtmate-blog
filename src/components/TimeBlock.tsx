import { Flex, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

import { eng, rus } from 'translation';
import { useAppSelector } from 'store/store';

interface ITimeBlock {
  createdAt: string;
  time_to_read: string;
}

export const TimeBlock = ({ time_to_read, createdAt }: ITimeBlock): JSX.Element => {
  const { currentLanguage } = useAppSelector(state => state.articles);
  const t = currentLanguage === 'en' ? eng : rus;

  return (
      <Flex fontWeight='500' fontSize='16px' color='#001240' lineHeight='180%' opacity='0.5'>
        <Text display={{ md: 'block', sm: 'none' }}>
          {createdAt && format(new Date(createdAt), currentLanguage === 'ru' ? 'd MMMM yyy' : 'd MMM yyy', { locale: currentLanguage === 'ru' ? ru : enUS }).toLocaleLowerCase()}
        </Text>
        <Text display={{ md: 'none', sm: 'block' }}>
          {createdAt && format(new Date(createdAt), currentLanguage === 'ru' ? 'd MMM yyy' : 'd MMM yyy', { locale: currentLanguage === 'ru' ? ru : enUS }).toLocaleLowerCase()}
        </Text>
        <Text mx='15px'>·</Text>
        <Text>{time_to_read} {t.generalArticlesData.time_for_reading}</Text>
      </Flex>
  );
};