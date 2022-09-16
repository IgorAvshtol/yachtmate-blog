import { useRouter } from 'next/router';
import { Button, Flex, Text } from '@chakra-ui/react';

import { SameArticle } from './SameArticle';
import { useAppSelector } from 'store/store';
import { sortSameArticles } from 'utils/sortSameArticles';
import { eng, rus } from 'translation';

export const SameArticles = (): JSX.Element => {
  const router = useRouter();
  const { articles } = useAppSelector(state => state.articles);
  const currentArticleId = router.query.index;
  const t = router.locale === 'en' ? eng : rus;

  return (
      <Flex direction='column' alignItems='center' maxW='1200px' w='100%' mt={{ md: '104px', sm: '52px' }} mb='80px'>
        <Text w={{ lg: '90%', md: '80%', sm: '90%' }} fontWeight='600' fontSize='26px' lineHeight='110%'
              letterSpacing='0.3px' color='#001240' textAlign={{ md: 'start', sm: 'center' }}>
          {t.same_way.title}
        </Text>
        <Flex direction='column' w={{ lg: '90%', md: '80%', sm: '90%' }}>
          <Flex justifyContent='space-between' m='20px -20px 0' overflowX={{ xl: 'hidden', lg: 'scroll', sm: 'scroll' }}
                whiteSpace={{ md: 'normal', sm: 'nowrap' }}>
            {
              sortSameArticles(articles, Number(currentArticleId)).map(article => <SameArticle key={article.id}
                                                                                               slug={article.attributes.slug}
                                                                                               title={article.attributes.main_title}
                                                                                               date={article.attributes.createdAt}
                                                                                               image={article.attributes.main_image.url}/>)
            }
          </Flex>
        </Flex>
        <Button mt='48px' w='147px' h='56px' borderRadius='28px' bg='rgba(0, 111, 19, 0.05)' color='#001240'
                zIndex='10'>
          {t.readBtn}
        </Button>
      </Flex>
  );
};