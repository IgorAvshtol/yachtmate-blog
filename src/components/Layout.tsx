import { Flex } from '@chakra-ui/react';
import { ReactNode, useEffect } from 'react';

import { Header } from './Header/Header';
import { TabsBlock } from './TabsBlock';
import { Footer } from './Footer/Footer';
import { useAppContext } from 'hooks/useAppContext';
import { getLangFromLocalStorage } from 'services/localStorage';

interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout) => {
  const { setCurrentLanguage, setCurrentArticleTab } = useAppContext();

  useEffect(() => {
    setCurrentArticleTab('');
  }, [setCurrentArticleTab]);

  useEffect(() => {
    const currentLang = getLangFromLocalStorage();
    setCurrentLanguage(currentLang);
  }, [setCurrentLanguage]);

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