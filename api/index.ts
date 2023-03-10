import axios, { AxiosRequestConfig } from 'axios';

import { getTokenFromLocalStorage, setTokenToLocalStorage } from 'services/localStorage';

export const instance = axios.create({
  withCredentials: false,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const instanceForAuth = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH as string,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'Authorization, X-Custom-Header',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
    mode: true,
  },

});

export const HttpConfig = {
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH as string,
    'Access-Control-Allow-Credentials': true,
  },
};

instanceForAuth.interceptors.request.use((config: AxiosRequestConfig) => {
  config.withCredentials = true;

  config.headers = {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH as string,
    'Access-Control-Allow-Credentials': true,
  };

  const token = getTokenFromLocalStorage();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});


instanceForAuth.interceptors.response.use(
    (config: AxiosRequestConfig) => {
      config.withCredentials = true;

      config.headers = {
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH as string,
        'Access-Control-Allow-Credentials': true,
      };

      return config;
    },
    async (error) => {
      const originalRequest = error.config;
      if (
          error.response.status === 401 &&
          error.config &&
          !error.config._isRetry
      ) {
        originalRequest._isRetry = true;
        try {
          const response = await axios.get(
              `${process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH as string}/user/token/refresh`, HttpConfig
          );

          setTokenToLocalStorage(response.data.accessToken);
          return instanceForAuth.request(originalRequest);
        } catch (e) {
          console.log('Non auth');
        }
      }
      throw error;
    }
);