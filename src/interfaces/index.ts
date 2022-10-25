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
  locale: string,
  hasLiked: string[],
}

export interface IResponseArticles {
  data: IArticleData[],
  meta: IMeta
}

export interface IArticleData {
  id: number,
  attributes: IAttributes
}

export interface IMeta {
  pagination: {
    page: number;
    total: number;
  };
}

export interface IArticlesState {
  articles: IArticleData[],
  articlesCount: number,
  totalArticlesCount: number,
  currentArticle: IArticleData,
  sameArticles: IArticleData[],
  currentTag: string,
  loading: TypeLoadingStatus,
  error: string,
}

export interface IGetArticles {
  pageSize: number;
  lang: string;
}

export interface IGetCurrentArticle {
  slug: string;
  lang: string;
}

export interface IUserData {
  _id: string,
  email: string,
  name: string,
  photo?: string
}

export interface ISignUpData {
  email: string;
  name: string;
  password: string;
  password_repeat?: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISendCodeForConfirmation {
  code: string;
  email: string;
}

export interface ISetNewPassword {
  password: string;
  email: string;
}

export interface ILikeData {
  articleId: number;
  userId: string;
}

export interface IAuthState {
  userData: IUserData;
  temporaryUserData: ISignUpData;
  loading: TypeLoadingStatus;
  signInModalOpen: boolean;
  signUpModalOpen: boolean;
  recoveryPasswordModalOpen: boolean;
  closeAllModals: boolean;
  setReceivedCodeModalOpen: boolean;
  setReceivedCodeForRegistrationModalOpen: boolean;
  setNewPasswordModalOpen: boolean;
  recoveryPasswordIsSuccessModalOpen: boolean;
  registrationIsSuccessModalOpen: boolean;
  emailForRecoveryPassword: string;
  error: string;
}