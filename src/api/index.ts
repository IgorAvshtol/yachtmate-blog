import axios, { AxiosRequestConfig } from 'axios';

import { getUserFromLocalStorage, setUserFromLocalStorage } from 'services/localStorage';

export const instance = axios.create({
  withCredentials: false,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const instanceForAuth = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH,
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH as string,
    'Access-Control-Allow-Credentials':true,
    // 'Access-Control-Allow-Headers': 'Authorization, X-Custom-Header',
    // 'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    mode: 'cors',
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

  const token = getUserFromLocalStorage();
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

          setUserFromLocalStorage(response.data.accessToken);
          // localStorage.setItem('token', response.data.accessToken);
          return instanceForAuth.request(originalRequest);
        } catch (e) {
          console.log('Non auth');
        }
      }
      throw error;
    }
);