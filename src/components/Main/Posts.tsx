import { useRouter } from 'next/router';
import { Button, Flex, Grid, Text } from '@chakra-ui/react';

import { Post } from './Post';
import { useAppDispatch, useAppSelector } from 'store/store';
import { eng, rus } from 'translation';
import { incrementArticlesCount } from 'store/atricles/articlesSlice';
import { TypeLoadingStatus } from 'interfaces';
import { PostsPageWithSkeleton } from '../Skeleton/PostsPageWithSkeleton';

export const Posts = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { articles, articlesCount, totalArticlesCount, loading } = useAppSelector(state => state.articles);
  const router = useRouter();
  const language = router.locale as string;
  const t = router.locale === 'en' ? eng : rus;

  const onMoreBtnClickHandler = () => {
    dispatch(incrementArticlesCount());
  };

  return (
      <Flex justifyContent='center' w='100%' py={{ md: '60px', sm: '40px' }} bg='#F5F7FB' pos='relative'>
        <Flex w={{ xl: '980px', lg: '70%', md: '70%' }} direction='column' alignItems='center' bg='#F5F7FB'>
          <Text as='h2' fontWeight='600' fontSize='32px' letterSpacing='0.3px'>
            {t.same_way.title}
          </Text>
          <Text w='300px' as='h3' mt='16px' fontWeight='400' fontSize='18px' opacity='0.6' textAlign='center'>
            {t.same_way.description}
          </Text>
          <Grid w='100%' mt={{ xl: '280px', md: '80px', sm: '30px' }} justifyContent='space-around'
                templateColumns='repeat(auto-fill, minmax(365px, 440px))' gap={{ xl: '100px', md: '50px', sm: '12px' }}>
            {
              articles.slice(2, articles.length).map(post => <Post key={post.id} title={post.attributes.main_title}
                                                                   lang={language}
                                                                   slug={post.attributes.slug}
                                                                   date={post.attributes.createdAt}
                                                                   image={process.env.NEXT_PUBLIC_BASE_IMAGE_URL + post.attributes.main_image_url}/>)
            }
          </Grid>
          {loading === TypeLoadingStatus.IS_PENDING && <PostsPageWithSkeleton/>}
          <Button display={articlesCount >= totalArticlesCount ? 'none' : 'block'} mt='80px' w='147px' h='56px'
                  borderRadius='28px' bg='rgba(0, 18, 64, 0.04)' color='#001240'
                  onClick={onMoreBtnClickHandler}>
            {t.moreBtn}
          </Button>
        </Flex>
      </Flex>
  );
};