import { useRouter } from 'next/router';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';

import { useAppContext } from 'hooks/useAppContext';
import { eng, rus } from 'translations/translation';

export const TabsBlock = (): JSX.Element => {
  const { currentArticleTab, currentLanguage } = useAppContext();
  const router = useRouter();
  const t = router.locale === 'en' || currentLanguage === 'en' ? eng : rus;

  return (
      <Flex h={{ md: '69px', sm: '53px' }} w='100%' borderY='1px solid rgba(0, 18, 64, 0.08)' alignItems='center'
            px='32px'>
        <Breadcrumb fontWeight='500' fontSize='16px' color='rgba(0, 18, 64, 0.4)' letterSpacing='0.03em'>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>{t.tabs_block.main_page}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage={!!currentArticleTab}>
            <BreadcrumbLink href='/'>{t.tabs_block.blog}</BreadcrumbLink>
          </BreadcrumbItem>
          {
              currentArticleTab &&
              <BreadcrumbItem isCurrentPage display={{ md: 'inline-flex', sm: 'none' }}>
                <BreadcrumbLink href='#' w='285px' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                  {currentArticleTab}
                </BreadcrumbLink>
              </BreadcrumbItem>
          }
        </Breadcrumb>
      </Flex>
  );
};