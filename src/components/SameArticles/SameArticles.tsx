import { useRouter } from 'next/router';
import { Button, Flex, Text } from '@chakra-ui/react';

import sameYacht from 'public/yacht.png';
import sameYacht1 from 'public/nose.png';
import sameYacht2 from 'public/preview.png';
import sameYacht3 from 'public/cormack.png';
import sameYacht4 from 'public/conquering.png';
import { SameArticle } from './SameArticle';
import { useAppContext } from 'hooks/useAppContext';
import { sortSameArticles } from 'utils/sortSameArticles';
import { eng, rus } from 'translations/translation';

const sameArticlesEn = [
  {
    id: 1,
    title: '3 Common Boating Safety Myths',
    date: '2 aug 2022',
    image: sameYacht
  },
  {
    id: 2,
    title: 'How I Thought of Yacht Sharing',
    date: '1 aug 2022',
    image: sameYacht1
  },
  {
    id: 3,
    title: 'Top 4 Boating Destinations in the USA',
    date: '28 jan 2022',
    image: sameYacht2
  },
  {
    id: 4,
    title: 'Boats vs Yachts: Is There Any Difference?',
    date: '2 aug 2022',
    image: sameYacht3
  },
  {
    id: 5,
    title: 'Conquering the Atlantic: Can You Cross the Ocean on a Yacht?',
    date: '2 aug 2022',
    image: sameYacht4
  }
];

const sameArticlesRu = [
  {
    id: 1,
    title: '3 распространенных мифа о безопасности на лодке',
    date: '2 августа 2022',
    image: sameYacht
  },
  {
    id: 2,
    title: 'Как я пришел в клуб судовладельцев и капитанов',
    date: '1 августа 2022',
    image: sameYacht1
  },
  {
    id: 3,
    title: '4 лучших места для путешествия на лодке в США',
    date: '28 января 2022',
    image: sameYacht2
  },
  {
    id: 4,
    title: 'Boats vs Yachts: Is There Any Difference?',
    date: '2 августа 2022',
    image: sameYacht3
  },
  {
    id: 5,
    title: 'Покоряя Атлантику: можно ли пересечь океан на яхте?',
    date: '2 августа 2022',
    image: sameYacht4
  }
];

interface ISameArticles {
  currentArticleIndex: number;
}

export const SameArticles = ({ currentArticleIndex }: ISameArticles): JSX.Element => {
  const { currentLanguage } = useAppContext();
  const router = useRouter();
  const t = router.locale === 'en' || currentLanguage === 'en' ? sameArticlesEn : sameArticlesRu;
  const tr = router.locale === 'en' || currentLanguage === 'en' ? eng : rus;

  return (
      <Flex direction='column' alignItems='center' w='100%' mt={{ md: '104px', sm: '52px' }} mb='80px'>
        <Text w='80%' fontWeight='600' fontSize='26px' lineHeight='110%' letterSpacing='0.3px' color='#001240'
              textAlign={{ md: 'start', sm: 'center' }}>
          {tr.same_way.title}
        </Text>
        <Flex direction='column' w={{ md: '80%', sm: '90%' }}>
          <Flex justifyContent='space-between' m='20px -20px 0' overflowX={{ md: 'hidden', sm: 'scroll' }}
                whiteSpace={{ md: 'normal', sm: 'nowrap' }}>
            {sortSameArticles(t, t[currentArticleIndex]).map(article => <SameArticle key={article.id}
                                                                                     title={article.title}
                                                                                     date={article.date}
                                                                                     image={article.image}/>)}
          </Flex>
        </Flex>
        <Button mt='48px' w='147px' h='56px' borderRadius='28px' bg='rgba(0, 111, 19, 0.05)' color='#001240'
                zIndex='10'>
          {tr.moreBtn}
        </Button>
      </Flex>
  );
};