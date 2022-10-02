import { IUserData } from 'interfaces';

const NEXT_APP_LOCALSTORAGE_KEY = 'token';
const NEXT_APP_USERDATA_KEY = 'userData';

export const getTokenFromLocalStorage = () => {
  const isServer = typeof window === 'undefined';
  if (!isServer) {
    try {
      return localStorage.getItem(NEXT_APP_LOCALSTORAGE_KEY);
    } catch (e) {
      console.log('JSON is not valid');
    }
  }
};

export const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem(NEXT_APP_USERDATA_KEY);
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (e) {
      console.log('JSON is not valid');
    }
  }
};

export const setTokenToLocalStorage = (token: string) => {
  return localStorage.setItem(NEXT_APP_LOCALSTORAGE_KEY, token);
};

export const setUserToLocalStorage = (userData: IUserData) => {
  return localStorage.setItem(NEXT_APP_USERDATA_KEY, JSON.stringify(userData));
};