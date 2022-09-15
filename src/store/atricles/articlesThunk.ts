import { createAsyncThunk } from '@reduxjs/toolkit';

import { instance } from 'api/instance';
import { IGetCurrentArticle } from 'interfaces';

export const getArticles = createAsyncThunk('articles/getArticles', async (lang: string) => {
  const response = await instance.get(`articles?locale=${lang}`);
  return response.data;
});

export const getCurrentArticle = createAsyncThunk(
    'articles/getCurrentArticle',
    async (data: IGetCurrentArticle) => {
      const response = await instance.get(`articles?filters[slug][$eq]=${data.slug}&locale=${data.lang}`);
      await instance.patch(`articles/${data.id}`);
      return response.data;
    }
);

export const setLike = createAsyncThunk(
    'articles/setLike',
    async (articleId: number) => {
      const response = await instance.patch(`articles/${articleId}/favourite`);
      return response.data;
    }
);

export const setUnlike = createAsyncThunk(
    'articles/setUnlike',
    async (articleId: number) => {
      const response = await instance.delete(`articles/${articleId}/favourite`);
      return response.data;
    }
);