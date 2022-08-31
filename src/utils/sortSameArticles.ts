import { ISameArticle } from '../interfaces';

export function sortSameArticles(articles: ISameArticle[], currentArticle: ISameArticle) {
  const filteredArticles = articles.filter(article => article !== currentArticle);
  return filteredArticles.splice(0, 3);
}