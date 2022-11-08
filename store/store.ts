import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { articleReducer } from './atricles/articlesSlice';
import { authReducer } from './auth/authSlice';

export const store = configureStore({
  reducer: {
    articles: articleReducer.reducer,
    auth: authReducer.reducer
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'articles/getArticles/fulfilled'
          ],
        },
      }),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;