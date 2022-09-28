import { createAsyncThunk } from '@reduxjs/toolkit';

import { httpService } from 'services/httpService';
import { IGetCurrentArticle } from 'interfaces';

export const getArticles = createAsyncThunk('articles/getArticles', async (lang: string) => {
  const response = await httpService.get(`articles?locale=${lang}&sort=id%3Aasc`);
  return response.data;
});

export const getCurrentArticle = createAsyncThunk(
    'articles/getCurrentArticle',
    async (data: IGetCurrentArticle) => {
      const response = await httpService.get(`articles?filters[slug][$eq]=${data.slug}&locale=${data.lang}`);
      // const a = await httpService.patch(`articles/${data.id}`);
      return response.data;
    }
);

export const setOneViewForArticle = createAsyncThunk(
    'articles/setView',
    async (id: number) => {
      await httpService.patch(`articles/${id}`);
    }
);

export const setLike = createAsyncThunk(
    'articles/setLike',
    async (articleId: number) => {
      const response = await httpService.patch(`articles/${articleId}/favourite`);
      return response.data;
    }
);

export const setUnlike = createAsyncThunk(
    'articles/setUnlike',
    async (articleId: number) => {
      const response = await httpService.delete(`articles/${articleId}/favourite`);
      return response.data;
    }
);