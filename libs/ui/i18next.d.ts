import 'i18next'

import admin from 'public/locales/en/admin.json'
import common from 'public/locales/en/common.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      common: typeof common
      admin: typeof admin
    }
  }
}
