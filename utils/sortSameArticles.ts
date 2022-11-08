import { IArticleData } from '../interfaces';

export function sortSameArticles(articles: IArticleData[], currentArticleId: number) {
  const filteredArticles = articles.filter(article => article.id !== currentArticleId);
  return filteredArticles.splice(0, 3);
}