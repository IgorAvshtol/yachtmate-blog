import { useRouter } from 'next/router';
import { Button, Flex, Grid, Text } from '@chakra-ui/react';

import mockPostCover1 from 'public/preview.png';
import mockPostCover2 from 'public/nose.png';
import mockPostCover3 from 'public/conquering.png';
import { Post } from './Post';
import { useAppContext } from 'hooks/useAppContext';
import { eng as en, rus as ru } from 'translations/translation';

const postsEn = [
  {
    id: 1,
    title: 'How I Thought of Yacht Sharing',
    date: 'aug 2, 2022',
    image: mockPostCover2,
    slug: 'how-i-thought-of-yacht-sharing'
  },
  {
    id: 2,
    title: 'Top 4 Boating Destinations in the USA',
    date: 'aug 2, 2022',
    image: mockPostCover1,
    slug: 'top-4-boating-destinations-in-the-usa'
  },
  {
    id: 3,
    title: 'Conquering the Atlantic: Can You Cross the Ocean on a Yacht?',
    date: 'aug 2, 2022',
    image: mockPostCover3,
    slug: 'conquering-the-atlantic-can-you-cross-the-ocean-on-a-yacht'
  }
];

const postsRu = [
  {
    id: 1,
    title: 'Как я пришел в клуб судовладельцев и капитанов',
    date: '2 августа, 2022',
    image: mockPostCover2,
    slug: 'how-i-thought-of-yacht-sharing'
  },
  {
    id: 2,
    title: '4 лучших места для путешествия на лодке в США',
    date: '2 августа, 2022',
    image: mockPostCover1,
    slug: 'top-4-boating-destinations-in-the-usa'
  },
  {
    id: 3,
    title: 'Покоряя Атлантику: можно ли пересечь океан на яхте?',
    date: '2 августа, 2022',
    image: mockPostCover3,
    slug: 'conquering-the-atlantic-can-you-cross-the-ocean-on-a-yacht'
  }
];

export const Posts = (): JSX.Element => {
  const { currentLanguage } = useAppContext();
  const router = useRouter();
  const t = router.locale === 'en' || currentLanguage === 'en' ? postsEn : postsRu;
  const tr = router.locale === 'en' || currentLanguage === 'en' ? en : ru;

  return (
      <Flex justifyContent='center' w='100%' py={{ md: '120px', sm: '40px' }} bg='#E5E5E5' pos='relative'>
        <Flex w={{ '2xl': '55%', xl: '70%', lg: '70%', md: '70%' }} direction='column' alignItems='center' bg='#E5E5E5'>
          <Text as='h2' fontWeight='600' fontSize='32px' letterSpacing='0.3px'>{tr.same_way.title}</Text>
          <Text w='300px' as='h3' mt='16px' fontWeight='400' fontSize='18px' opacity='0.6' textAlign='center'>
            {tr.same_way.description}
          </Text>
          <Grid w='100%' mt={{ md: '280px', sm: '30px' }} justifyContent='space-around'
                templateColumns='repeat(auto-fill, minmax(375px, 440px))' gap={{ xl: '100px', md: '50px', sm: '12px' }}>
            {
              t.map(post => <Post key={post.id} title={post.title} date={post.date} image={post.image}
                                  slug={post.slug}/>)
            }
          </Grid>
          <Button mt='80px' w='147px' h='56px' borderRadius='28px' bg='rgba(0, 111, 19, 0.05)' color='#001240'>
            {tr.moreBtn}
          </Button>
        </Flex>
      </Flex>
  );
};