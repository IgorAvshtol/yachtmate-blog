import axios from 'axios';

export const httpService = axios.create({
  withCredentials: false,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const instanceForAuth = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_FOR_AUTH,
});
