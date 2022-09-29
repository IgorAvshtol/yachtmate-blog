const NEXT_APP_LOCALSTORAGE_KEY = 'token';

export const getUserFromLocalStorage = () => {
  const isServer = typeof window === "undefined";
  if (!isServer) {
    try {
      const data = localStorage.getItem(NEXT_APP_LOCALSTORAGE_KEY);
      return data && JSON.parse(data);
    } catch (e) {
      console.log('JSON is not valid');
    }
  }
};

export const setUserFromLocalStorage = (token: string) => {
  return localStorage.setItem(NEXT_APP_LOCALSTORAGE_KEY, JSON.stringify(token));
};