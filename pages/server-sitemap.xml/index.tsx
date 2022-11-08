import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

import { IResponseArticles } from 'interfaces';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles?locale=all`);
  const { data }: IResponseArticles = await response.json();

  const fields: ISitemapField[] = data.map(article => ({
    loc: `${process.env.NEXT_PUBLIC_BASE_MAIN_PAGE_URL}/${article.attributes.locale}/blog/${article.attributes.slug}`,
    lastmod: new Date().toISOString()
  }));

  return getServerSideSitemap(context, fields);
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function SitemapIndex() {}