import { createAsyncThunk } from '@reduxjs/toolkit';

import { instance } from 'api';
import { IGetArticles, IGetCurrentArticle, ILikeData } from 'interfaces';

export const getArticles = createAsyncThunk('articles/getNextArticles', async (data: IGetArticles) => {
  const response = await instance.get(`articles?locale=${data.lang}&pagination[page]=1&pagination[pageSize]=${data.pageSize}&sort=id%3Aasc`);
  return response.data;
});

export const getCurrentArticle = createAsyncThunk(
    'articles/getCurrentArticle',
    async (data: IGetCurrentArticle) => {
      const response = await instance.get(`articles?filters[slug][$eq]=${data.slug}&locale=${data.lang}`);
      return response.data;
    }
);

export const setOneViewForArticle = createAsyncThunk(
    'articles/setView',
    async (id: number) => {
      await instance.patch(`articles/${id}`);
    }
);

export const setLike = createAsyncThunk(
    'articles/setLike',
    async (likeData: ILikeData) => {
      const response = await instance.patch(`articles/${likeData.articleId}/favourite/${likeData.userId}`);
      return response.data;
    }
);

export const setUnlike = createAsyncThunk(
    'articles/setUnlike',
    async (likeData: ILikeData) => {
      const response = await instance.delete(`articles/${likeData.articleId}/favourite/${likeData.userId}`);
      return response.data;
    }
);