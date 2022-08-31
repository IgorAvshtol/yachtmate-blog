import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Header } from './Header/Header';
import { TabsBlock } from './TabsBlock';
import { Footer } from './Footer/Footer';

interface ILayout {
  children: ReactNode;
}

export const Layout = ({ children }: ILayout) => {
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