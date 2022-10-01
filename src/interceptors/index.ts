import axios, { AxiosRequestConfig } from 'axios';
import { getTokenFromLocalStorage } from '../services/localStorage';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH,
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.withCredentials = true;
  config.headers = {
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH as string,
    'Access-Control-Allow-Credentials': true,
  };
  const data = getTokenFromLocalStorage();
  config.headers.Authorization = `Bearer ${data}`;
  console.log(config);
  return config;
});

instance.interceptors.response.use(
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
              `${process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH as string}/user/token/refresh`
          );
          localStorage.setItem('token', response.data.accessToken);
          return instance.request(originalRequest);
        } catch (e) {
          console.log('Non auth');
        }
      }
      throw error;
    }
);

export const axiosPrivate = instance;
