import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { IArticleData, IArticlesState, IAttributes, TypeLoadingStatus, } from 'interfaces';
import { getArticles, getCurrentArticle, setLike, setUnlike } from './articlesThunk';

export const initialState: IArticlesState = {
  articles: [],
  currentArticle: {} as IArticleData,
  sameArticles: [],
  currentTag: '',
  loading: TypeLoadingStatus.IS_RESOLVED,
  error: '',
};

export const articleReducer = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getArticles.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            getArticles.fulfilled.type,
            (state, action: PayloadAction<AxiosResponse<IArticleData[]>>) => {
              state.articles = action.payload.data;
              state.sameArticles = action.payload.data.slice(1, -1);
              state.loading = TypeLoadingStatus.IS_RESOLVED;
            }
        )
        .addCase(getArticles.rejected, (state) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
        })
        .addCase(getCurrentArticle.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(getCurrentArticle.fulfilled.type,
            (state, action: PayloadAction<AxiosResponse<IArticleData[]>>) => {
              state.currentArticle = action.payload.data[0];
              state.currentTag = action.payload.data[0]?.attributes?.main_title;
              state.loading = TypeLoadingStatus.IS_RESOLVED;
            }
        )
        .addCase(getCurrentArticle.rejected, (state) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
        })
        .addCase(setLike.fulfilled.type,
            (state, action: PayloadAction<IAttributes>) => {
              state.currentArticle.attributes = action.payload;
              state.loading = TypeLoadingStatus.IS_RESOLVED;
            }
        )
        .addCase(setUnlike.fulfilled.type,
            (state, action: PayloadAction<IAttributes>) => {
              state.currentArticle.attributes = action.payload;
              state.loading = TypeLoadingStatus.IS_RESOLVED;
            }
        );

  },
});