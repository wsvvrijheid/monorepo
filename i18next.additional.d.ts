import 'i18next'
// import all namespaces (for the default language, only)
import common from './public/locales/en/common.json'

declare module 'next-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'common'
    // custom resources type
    resources: {
      common: typeof common
    }
  }
}
