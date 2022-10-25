import { Flex, Text } from '@chakra-ui/react';

import { eng, rus } from 'translation';
import { LastArticle } from './LastArticle';
import { PenultimateArticle } from './PenultimateArticle';
import { useAppSelector } from 'store/store';

export const MainPosts = (): JSX.Element => {
  const { currentLanguage } = useAppSelector(state => state.articles);
  const t = currentLanguage === 'en' ? eng : rus;

  return (
      <Flex direction='column' mb={{ md: '124px', sm: '24px' }} maxW='1100px' w={{ lg: '75%', md: '85%', sm: '90%' }}>
        <Text as='h1' fontWeight='600' fontSize={{ md: '48px', sm: '40px' }} lineHeight='120%'
              letterSpacing={{ md: '1.5px', sm: '0.3px' }}>
          {t.main_title}
        </Text>
        <Flex mt={{ md: '40px', sm: '24px' }} justifyContent='space-between' flexDir={{ md: 'row', sm: 'column' }}>
          <LastArticle/>
          <PenultimateArticle/>
        </Flex>
      </Flex>
  );
};