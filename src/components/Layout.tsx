import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';

import { Header } from './Header/Header';
import { TabsBlock } from './TabsBlock';
import { Footer } from './Footer/Footer';
import { useAppDispatch } from 'store/store';
import { getArticles } from 'store/atricles/articlesThunk';
import { auth } from 'store/auth/authThunk';

interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const language = router.locale as string;

  useEffect(() => {
    dispatch(getArticles(language));
    dispatch(auth());
  }, [dispatch, language]);

  return (
      <Flex minH='100vh' w='100%' h='100%' alignItems='center' flexDirection='column'>
        <Header/>
        <TabsBlock/>
        <Flex justifyContent='center' w='100%'>
          {children}
        </Flex>
        <Footer/>
      </Flex>
  );
};