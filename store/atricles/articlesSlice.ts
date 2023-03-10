import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IArticleData, IArticlesState, IAttributes, IResponseArticles, TypeLoadingStatus, } from 'interfaces';
import { getArticles, setLike, setUnlike } from './articlesThunk';

export const initialState: IArticlesState = {
  articles: [],
  articlesCount: 5,
  totalArticlesCount: 10,
  currentArticle: {} as IArticleData,
  sameArticles: [],
  currentTag: '',
  loading: TypeLoadingStatus.IS_RESOLVED,
  error: '',
};

export const articleReducer = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    incrementArticlesCount: (state) => {
      state.articlesCount = state.articlesCount + 5;
    },
    setArticlesTab: (state, action: PayloadAction<string>) => {
      state.currentTag = action.payload;
    },
    clearCurrentTag: (state) => {
      state.currentTag = '';
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(getArticles.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            getArticles.fulfilled.type,
            (state, action: PayloadAction<IResponseArticles>) => {
              const end = action.payload.data.length - 2;
              const start = action.payload.data.length - 5;
              state.articles = action.payload.data.reverse();
              state.totalArticlesCount = action.payload.meta.pagination.total;
              state.sameArticles = action.payload.data.slice(start, end).reverse();
              state.loading = TypeLoadingStatus.IS_RESOLVED;
            }
        )
        .addCase(getArticles.rejected, (state) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
        })
        // .addCase(getCurrentArticle.pending, (state) => {
        //   state.loading = TypeLoadingStatus.IS_PENDING;
        // })
        // .addCase(getCurrentArticle.fulfilled.type,
        //     (state, action: PayloadAction<AxiosResponse<IArticleData[]>>) => {
        //       state.currentArticle = action.payload.data[0];
        //       state.currentTag = action.payload.data[0]?.attributes?.main_title;
        //       state.loading = TypeLoadingStatus.IS_RESOLVED;
        //     }
        // )
        // .addCase(getCurrentArticle.rejected, (state) => {
        //   state.loading = TypeLoadingStatus.IS_REJECTED;
        // })
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

export const { incrementArticlesCount, clearCurrentTag, setArticlesTab } = articleReducer.actions;