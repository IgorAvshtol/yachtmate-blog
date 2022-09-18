export enum TypeLoadingStatus {
  IS_PENDING = 'IS_PENDING',
  IS_RESOLVED = 'IS_RESOLVED',
  IS_REJECTED = 'IS_REJECTED',
}

export interface IAttributes {
  slug: string,
  time_to_read: string,
  main_title: string,
  main_description: string,
  meta_title: string,
  main_image_url: string,
  main_image_authors: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  paragraphs: string,
  postscriptum: string,
  view: number,
  hasLiked: string[],
}

export interface IArticleData {
  id: number,
  attributes: IAttributes
}

export interface IArticlesState {
  articles: IArticleData[],
  currentArticle: IArticleData,
  sameArticles: IArticleData[],
  currentTag: string,
  loading: TypeLoadingStatus,
  error: string,
}

export interface IGetCurrentArticle {
  slug: string;
  lang: string;
  id: number;
}

export interface IUserData {
  id: string,
  email: string,
  name: string,
}

export interface IAuthState {
  userData: IUserData;
  loading: TypeLoadingStatus;
}