import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    defaultNS: 'common',
  })

export default i18n
