import { useRouter } from 'next/router';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector } from 'store/store';
import { eng, rus } from 'translation';
import { clearCurrentTag } from 'store/atricles/articlesSlice';

export const TabsBlock = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentTag = useAppSelector(state => state.articles.currentTag);
  const t = router.locale === 'en' ? eng : rus;

  const onHomePageRouteClickHandler = async () => {
    await router.push('/', '/', { locale: router.locale });
    dispatch(clearCurrentTag());
  };

  return (
      <Flex h={{ md: '69px', sm: '53px' }} borderY='1px solid rgba(0, 18, 64, 0.08)' justifyContent='center'
            alignItems='center'>
        <Breadcrumb w={{ md: '95%', sm: '90%' }} fontWeight='500' fontSize='16px' color='rgba(0, 18, 64, 0.4)'
                    letterSpacing='0.03em'>
          <BreadcrumbItem>
            <BreadcrumbLink href={router.locale === 'en' ? process.env.NEXT_PUBLIC_BASE_URL_FOR_HOME_PAGE : process.env.NEXT_PUBLIC_BASE_URL_FOR_HOME_PAGE_RU}>
              {t.tabs_block.main_page}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={onHomePageRouteClickHandler}>{t.tabs_block.blog}</BreadcrumbLink>
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