import { extendTheme } from '@chakra-ui/react';
import i18n from './i18next.js';
import { themes } from '@wsvvrijheid/config';

export const parameters = {
  i18n,
  locale: 'en',
  locales: {
    en: 'English',
    nl: 'Nederlands',
    tr: 'Türkçe',
  },
  chakra: {
    theme: extendTheme({
      ...themes.wsvvrijheid,
      colors: { primary: themes.wsvvrijheid.colors.blue },
    }),
  },
};
