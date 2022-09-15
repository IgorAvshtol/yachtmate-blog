import { createAsyncThunk } from '@reduxjs/toolkit';

import { instance } from 'api/instance';

export const auth = createAsyncThunk('auth/me', async () => {
  const response = await instance.get('/me');
  return response.data;
});
