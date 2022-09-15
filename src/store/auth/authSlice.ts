import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAuthState, IUserData, TypeLoadingStatus, } from 'interfaces';
import { auth } from './authThunk';

export const initialState: IAuthState = {
  userData: {} as IUserData,
  loading: TypeLoadingStatus.IS_RESOLVED
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(auth.pending, (state) => {
          state.loading = TypeLoadingStatus.IS_PENDING;
        })
        .addCase(
            auth.fulfilled.type,
            (state, action: PayloadAction<IUserData>) => {
              state.userData = action.payload;
              state.loading = TypeLoadingStatus.IS_RESOLVED;
            }
        )
        .addCase(auth.rejected, (state) => {
          state.loading = TypeLoadingStatus.IS_REJECTED;
        });
  },
});