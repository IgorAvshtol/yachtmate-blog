const NEXT_APP_LOCALSTORAGE_KEY = 'token';

export const getUserFromLocalStorage = () => {
  const data = localStorage.getItem(NEXT_APP_LOCALSTORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.log('JSON is not valid');
    }
  }
};

export const setUserFromLocalStorage = (token: string) => {
  return localStorage.setItem(NEXT_APP_LOCALSTORAGE_KEY, JSON.stringify(token));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(NEXT_APP_LOCALSTORAGE_KEY);
};