const NEXT_APP_LOCALSTORAGE_KEY = 'token';

export const getUserFromLocalStorage = () => {
  const isServer = typeof window === "undefined";
  if (!isServer) {
    try {
      return localStorage.getItem(NEXT_APP_LOCALSTORAGE_KEY);
    } catch (e) {
      console.log('JSON is not valid');
    }
  }
};

export const setUserFromLocalStorage = (token: string) => {
  return localStorage.setItem(NEXT_APP_LOCALSTORAGE_KEY, token);
};