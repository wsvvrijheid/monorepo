import 'i18next'

import admin from 'public/locales/en/admin.json'
import common from 'public/locales/en/common.json'
import model from 'public/locales/en/model.json'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: {
      admin: typeof admin
      common: typeof common
      model: typeof model
    }
  }
}
