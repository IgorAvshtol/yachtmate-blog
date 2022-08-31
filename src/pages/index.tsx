import Head from 'next/head';
import { useEffect } from 'react';

import { Main } from 'components/Main/Main';
import { getLangFromLocalStorage } from 'services/localStorage';
import { useAppContext } from 'hooks/useAppContext';

const Home = (): JSX.Element => {
  const { setCurrentLanguage, setCurrentArticleTab } = useAppContext();

  useEffect(() => {
    setCurrentArticleTab('');
  }, [setCurrentArticleTab]);

  useEffect(() => {
    const currentLang = getLangFromLocalStorage();
    setCurrentLanguage(currentLang);
  }, [setCurrentLanguage]);

  return (
      <>
        <Head>
          <title>Yachtmate</title>
        </Head>
        <Main/>
      </>
  );
};

export default Home;