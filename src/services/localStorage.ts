const NEXT_APP_LOCALSTORAGE_KEY = 'lang';

export const getLangFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(NEXT_APP_LOCALSTORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.log('JSON is not valid');
      }
    }
  }
};

export const setLangFromLocalStorage = (lang: string) => {
  return localStorage.setItem(NEXT_APP_LOCALSTORAGE_KEY, JSON.stringify(lang));
};