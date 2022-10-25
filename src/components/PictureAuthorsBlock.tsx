import { nanoid } from 'nanoid';
import { Flex, Text } from '@chakra-ui/react';

import { authorsNameHandler } from 'utils/authorsNameHandler';
import { eng, rus } from 'translation';
import { useAppSelector } from 'store/store';

interface IPictureAuthorsBlock {
  authors: string;
}

export const PictureAuthorsBlock = ({ authors }: IPictureAuthorsBlock): JSX.Element => {
  const { currentLanguage } = useAppSelector(state => state.articles);
  const t = currentLanguage === 'en' ? eng : rus;

  return (
      <Flex justifyContent='center' flexWrap='wrap' mt='16px' w={{ md: '100%', sm: '90%' }} textAlign='center'
            fontWeight='500' fontSize='14px' lineHeight='140%' letterSpacing='0.5' opacity='0.5'>
        <Text>
          {t.generalArticlesData.authors}:&nbsp;
        </Text>
        {
            authors && authorsNameHandler(authors).map(author => <Text key={nanoid()}>{author}</Text>)
        }
      </Flex>
  );
};