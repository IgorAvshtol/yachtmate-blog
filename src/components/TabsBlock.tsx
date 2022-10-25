import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';

import { useAppSelector } from 'store/store';
import { eng, rus } from 'translation';

export const TabsBlock = (): JSX.Element => {
  const currentTag = useAppSelector(state => state.articles.currentTag);
  const { currentLanguage } = useAppSelector(state => state.articles);
  const t = currentLanguage === 'en' ? eng : rus;

  return (
      <Flex h={{ md: '69px', sm: '53px' }} w='100%' borderY='1px solid rgba(0, 18, 64, 0.08)' alignItems='center'
            px='32px'>
        <Breadcrumb fontWeight='500' fontSize='16px' color='rgba(0, 18, 64, 0.4)' letterSpacing='0.03em'>
          <BreadcrumbItem>
            <BreadcrumbLink href={process.env.NEXT_PUBLIC_BASE_URL_FOR_HOME_PAGE}>
              {t.tabs_block.main_page
              }</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>{t.tabs_block.blog}</BreadcrumbLink>
          </BreadcrumbItem>
          {
              currentTag &&
              <BreadcrumbItem isCurrentPage display={{ md: 'inline-flex', sm: 'none' }}>
                <BreadcrumbLink href='#' w='285px' overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
                  {currentTag}
                </BreadcrumbLink>
              </BreadcrumbItem>
          }
        </Breadcrumb>
      </Flex>
  );
};