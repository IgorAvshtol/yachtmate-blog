import axios from 'axios';

export const instance = axios.create({
  withCredentials: false,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
