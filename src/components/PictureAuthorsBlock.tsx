import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { Flex, Text } from '@chakra-ui/react';

import { authorsNameHandler } from 'utils/authorsNameHandler';
import { IPictureAuthorsBlock } from 'interfaces';
import { eng, rus } from 'translations/translation';
import { useAppContext } from 'hooks/useAppContext';

export const PictureAuthorsBlock = ({ authors }: IPictureAuthorsBlock): JSX.Element => {
  const { currentLanguage } = useAppContext();
  const router = useRouter();
  const t = router.locale === 'en' || currentLanguage === 'en' ? eng : rus;

  return (
      <Flex justifyContent='center' mt='16px' w={{ md: '100%', sm: '90%' }} textAlign='center' fontWeight='500'
            fontSize='14px' lineHeight='140%' letterSpacing='0.5' opacity='0.5'>
        <Text>{t.generalArticlesData.authors}:&nbsp;</Text>
        {
          authorsNameHandler(authors).map(author => <Text key={nanoid()}>{author}</Text>)
        }
      </Flex>
  );
};