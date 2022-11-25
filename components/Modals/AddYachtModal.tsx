import { useRouter } from 'next/router';
import { Button, Flex, Text } from '@chakra-ui/react';

import { useAppSelector } from 'store/store';
import { TypeLoadingStatus } from 'interfaces';
import { eng, rus } from 'translation';

export const AddYachtModal = (): JSX.Element => {
  const router = useRouter();
  const t = router.locale === 'en' ? eng : rus;
  const { loading } = useAppSelector(state => state.auth);

  const onPlaceYachtButtonClickHandler = async () => {
    if (router.locale === 'en') {
      await router.push(process.env.NEXT_PUBLIC_BASE_URL_FOR_ADD_YACHT_PAGE as string);
    } else if (router.locale === 'ru')
      await router.push(process.env.NEXT_PUBLIC_BASE_URL_FOR_ADD_YACHT_PAGE_RU as string);
  };

  return (
      <Flex direction='column'>
        <Text as='h2' fontWeight='600' fontSize='32px' letterSpacing='0.3px'>{t.add_yacht_modal.title}</Text>
        <Flex mt='20px' direction='column'>
          <Text fontSize='16px' lineHeight='140%' letterSpacing='0.7px' color='rgba(0, 18, 64, 0.6)'>
            {t.add_yacht_modal.description_paragraph_first}
          </Text>
          <Text mt='20px' fontSize='16px' lineHeight='140%' letterSpacing='0.7px' color='rgba(0, 18, 64, 0.6)'>
            {t.add_yacht_modal.description_paragraph_second}
          </Text>
        </Flex>
        {
            loading !== TypeLoadingStatus.IS_PENDING &&
            <Button mt='32px' mb='30px' w='100%' h='56px' p='20px 24px' bg='#0250C8' borderRadius='32px'
                    _hover={{ bgColor: '#0250C8' }} onClick={onPlaceYachtButtonClickHandler}>
              {t.add_yacht_modal.btn}
            </Button>
        }
      </Flex>
  );
};