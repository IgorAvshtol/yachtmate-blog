import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { instanceForAuth } from 'api';
import { ISendCodeForConfirmation, ISetNewPassword, ISignInData, ISignUpData } from 'interfaces';
import { setTokenToLocalStorage, setUserToLocalStorage } from 'services/localStorage';

export const auth = createAsyncThunk('auth/me', async () => {
  const response = await instanceForAuth.get('user/token/refresh');
  return response.data.user;
});

export const getRegistrationCode = createAsyncThunk(
    'auth/getRegistrationCode',
    async (userData: ISignUpData, { rejectWithValue }) => {
      try {
        await instanceForAuth.post('user/code', { email: userData.email });
        return userData;
      } catch (e) {
        if (e instanceof AxiosError) {
          return e.response && rejectWithValue(e.response.data.message);
        }
      }
    }
);

export const sendRegistrationCode = createAsyncThunk(
    'auth/sendRegistrationCode',
    async (codeData: ISendCodeForConfirmation, { rejectWithValue }) => {
      try {
        const response = await instanceForAuth.post('user/code/compare', codeData);
        return response.data.status;
      } catch (e) {
        if (e instanceof AxiosError) {
          return e.response && rejectWithValue(e.response.data.message);
        }
      }
    }
);

export const registration = createAsyncThunk(
    'auth/registration',
    async (signUpData: ISignUpData, { rejectWithValue }) => {
      const user = {
        name: signUpData.name,
        email: signUpData.email,
        password: signUpData.password,
      };
      try {
        const response = await instanceForAuth.post('user/register', user);
        setTokenToLocalStorage(response.data.accessToken);
        const { _id, email, name } = response.data.user;
        setUserToLocalStorage({ _id: _id, email: email, name: name });
        return response.data.user;
      } catch (e) {
        if (e instanceof AxiosError) {
          return e.response && rejectWithValue(e.response.data.message);
        }
      }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (signInData: ISignInData, { rejectWithValue }) => {
      const user = {
        email: signInData.email,
        password: signInData.password,
      };
      try {
        const response = await instanceForAuth.post('user/auth', user);
        setTokenToLocalStorage(response.data.accessToken);
        const { _id, email, name } = response.data.user;
        setUserToLocalStorage({ _id: _id, email: email, name: name });
        return response.data.user;
      } catch (e) {
        if (e instanceof AxiosError) {
          return e.response && rejectWithValue(e.response.data.message);
        }
      }
    }
);

export const sendEmailForRecoveryPassword = createAsyncThunk(
    'auth/recoveryPassword',
    async (email: string, { rejectWithValue }) => {
      const resetEmail = {
        email: email
      };
      try {
        await instanceForAuth.post('user/reset/code', resetEmail);
        return resetEmail.email;
      } catch (e) {
        if (e instanceof AxiosError) {
          return e.response && rejectWithValue(e.response.data.message);
        }
      }
    }
);

export const sendConfirmationCode = createAsyncThunk(
    'auth/receivedCode',
    async (codeData: ISendCodeForConfirmation, { rejectWithValue }) => {
      const receivedCode = {
        code: codeData.code,
        email: codeData.email
      };
      try {
        await instanceForAuth.post('user/reset/compare', receivedCode);
      } catch (e) {
        return rejectWithValue('Code error');
      }
    }
);

export const setNewPassword = createAsyncThunk(
    'auth/setNewPassword',
    async (newPasswordData: ISetNewPassword, { rejectWithValue }) => {
      const newPassword = {
        password: newPasswordData.password,
        email: newPasswordData.email
      };
      try {
        await instanceForAuth.put('user/reset', newPassword);
      } catch (e) {
        return rejectWithValue('Error 500');
      }
    }
);