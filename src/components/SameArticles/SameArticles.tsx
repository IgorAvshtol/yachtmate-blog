import { Button, Flex, Text } from '@chakra-ui/react';

import sameYacht from 'public/sameYacht.png';
import sameYacht1 from 'public/sameYacht1.png';
import sameYacht2 from 'public/sameYacht2.png';
import { SameArticle } from './SameArticle';

const sameArticles = [
  {
    id: 1,
    title: 'Why are Europe and Canada not in the same boat as the US in terry henry',
    date: '2 aug 2022',
    image: sameYacht
  },
  {
    id: 2,
    title: 'Two women in a boat: provoking competition, distrust, amazing man tall',
    date: '1 aug 2022',
    image: sameYacht1
  },
  {
    id: 3,
    title: 'Two women in a boat: provoking competition, distrust, amazing man tall',
    date: '28 jan 2022',
    image: sameYacht2
  },
];

export const SameArticles = (): JSX.Element => {
  return (
      <Flex direction='column' alignItems='center' w='100%' mt={{ md: '104px', sm: '52px' }} mb='80px'>
        <Text w='80%' fontWeight='600' fontSize='26px' lineHeight='110%' letterSpacing='0.3px' color='#001240'
              textAlign={{ md: 'start', sm: 'center' }}>
          Same way
        </Text>
        <Flex direction='column' w={{ md: '80%', sm: '90%' }}>
          <Flex justifyContent='space-between' m='20px -20px 0' overflowX={{ md: 'hidden', sm: 'scroll' }}
                whiteSpace={{ md: 'normal', sm: 'nowrap' }}>
            {sameArticles.map(article => <SameArticle key={article.id} title={article.title} date={article.date}
                                                      image={article.image}/>)}
          </Flex>
        </Flex>
        <Button mt='48px' w='147px' h='56px' borderRadius='28px' bg='rgba(0, 111, 19, 0.05)' color='#001240'
                zIndex='10'>
          Read More
        </Button>
      </Flex>
  );
};