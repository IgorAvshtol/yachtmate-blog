import { StaticImageData } from 'next/image';

export interface IAuthorsName {
  id: number;
  name: string;
}

export interface IPictureAuthorsBlock {
  authors: IAuthorsName[]
}

export interface ISameArticle {
  id?: number,
  title: string,
  date: string,
  image: StaticImageData
}