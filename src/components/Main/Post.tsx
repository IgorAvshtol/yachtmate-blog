import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { Box, GridItem, Text } from '@chakra-ui/react';

import { useAppContext } from 'hooks/useAppContext';
import { AccessibilityLink } from '../AccessibilityLink';

interface IPost {
  title: string;
  image: StaticImageData;
  date: string;
  slug: string;
}

export const Post = ({ image, title, date, slug }: IPost): JSX.Element => {
  const router = useRouter();
  const { setCurrentArticleTab } = useAppContext();

  const onPostClickHandler = async () => {
    setCurrentArticleTab(title);
    await router.push({
      pathname: `/blog/${slug}`
    });
  };

  return (
      <GridItem maxH='438px' h='max-content' p='20px' bg='white' borderRadius='12px'
                _even={{ md: { mt: '10px', sm: '0' } }}
                _odd={{ md: { mt: '-200px', sm: '0' } }}>
        <Box borderRadius='8px' overflow='hidden'>
          <Image src={image} layout='responsive' height='226px' width='400px' alt='postCover'/>
        </Box>
        <Text mt='20px' mb='12px' fontSize='14px' letterSpacing='0.5px' opacity='0.5'>
          {date}
        </Text>
        <Text onClick={onPostClickHandler} as='h2' fontSize={{ md: '26px', sm: '20px' }}
              _hover={{ textDecoration: 'underline' }}>
          <AccessibilityLink to={`/blog/${slug}`}>{title}</AccessibilityLink>
        </Text>
      </GridItem>
  );
};
