import { APP_SETTINGS } from './settings';

interface TextDictionary {
  // Key and value.
  // Language, category / section, item.
  [lang: string]: { [category: string]: { [item: string]: string } };
}

const APP_TEXT: TextDictionary = {
  en: {
    app: {
      name: 'Expense Tracker',
    },
  },
  es: {
    app: {
      name: 'Expense Tracker',
    },
  },
};

// Categories that you can search for when you are searching text.
type CategoriesAvailable = 'app' | '';

export const GET_APP_TEXT = (category: CategoriesAvailable, text: string) => {
  return APP_TEXT[APP_SETTINGS.lang][category][text];
};
