import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button, Flex, Link, Text } from '@chakra-ui/react';
import { ISameArticle } from 'interfaces';
import { eng, rus } from 'translations/translation';
import { useAppContext } from 'hooks/useAppContext';

export const SameArticle = ({ image, date, title }: ISameArticle): JSX.Element => {
  const [showReadBtn, setShowReadBtn] = useState<boolean>(false);
  const { currentLanguage } = useAppContext();
  const router = useRouter();
  const t = router.locale === 'en' || currentLanguage === 'en' ? eng : rus;

  const onMouseOverArticle = () => {
    setShowReadBtn(true);
  };

  const onMouseOutArticle = () => {
    setShowReadBtn(false);
  };

  return (
      <Flex direction='column' w={{ md: '330px', sm: '280px' }} m='20px 20px 0' onMouseOver={onMouseOverArticle}
            onMouseOut={onMouseOutArticle} zIndex='10'>
        <Flex pos='relative' w='100%' h='220px' justifyContent='center' alignItems='center' borderRadius='12px'
              overflow='hidden'>
          <Image src={image} layout='fill' objectFit='cover' width='330px' height='220px' alt='same-yacht'/>
          <Button pos='absolute' opacity={showReadBtn ? '1' : '0'} w='96px' h='44px' borderRadius='21px' bg='white'
                  fontSize='14px' letterSpacing='0.5px' color='#0250C8'>
            {t.readBtn}
          </Button>
        </Flex>
        <Text display={{ md: 'none', sm: 'block' }} mt='12px' fontSize='14px' lineHeight='140%' letterSpacing='0.5px'
              opacity='0.5'>
          {date}
        </Text>
        <Link href='/' w={{ md: '330px', sm: '280px' }} whiteSpace='pre-line'>
          <Text mt='12px' fontSize='20px' lineHeight='148%' noOfLines={2}>{title}</Text>
        </Link>
        <Text display={{ md: 'block', sm: 'none' }} mt='12px' fontSize='14px' lineHeight='140%' letterSpacing='0.5px'
              opacity='0.5'>
          {date}
        </Text>
      </Flex>
  );
};