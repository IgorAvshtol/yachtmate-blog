import { useRouter } from 'next/router';
import { Button, Flex, Grid, Text } from '@chakra-ui/react';

import { Post } from './Post';
import { useAppSelector } from 'store/store';
import { eng, rus } from 'translation';

export const Posts = (): JSX.Element => {
  const { sameArticles } = useAppSelector(state => state.articles);
  const router = useRouter();
  const language = router.locale as string;
  const t = router.locale === 'en' ? eng : rus;

  return (
      <Flex justifyContent='center' w='100%' py={{ md: '60px', sm: '40px' }} bg='#F5F7FB' pos='relative'>
        <Flex w={{ '2xl': '55%', xl: '70%', lg: '70%', md: '70%' }} direction='column' alignItems='center' bg='#F5F7FB'>
          <Text as='h2' fontWeight='600' fontSize='32px' letterSpacing='0.3px'>
            {t.same_way.title}
          </Text>
          <Text w='300px' as='h3' mt='16px' fontWeight='400' fontSize='18px' opacity='0.6' textAlign='center'>
            {t.same_way.description}
          </Text>
          <Grid w='100%' mt={{ md: '280px', sm: '30px' }} justifyContent='space-around'
                templateColumns='repeat(auto-fill, minmax(365px, 440px))' gap={{ xl: '100px', md: '50px', sm: '12px' }}>
            {
              sameArticles.map(post => <Post key={post.id} title={post.attributes.main_title} lang={language}
                                             slug={post.attributes.slug} date={post.attributes.createdAt}
                                             image={post.attributes.main_image.url}/>)
            }
          </Grid>
          <Button mt='80px' w='147px' h='56px' borderRadius='28px' bg='rgba(0, 111, 19, 0.05)' color='#001240'>
            {t.moreBtn}
          </Button>
        </Flex>
      </Flex>
  );
};