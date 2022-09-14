import { Expand } from './common'
import { StrapiBase } from './strapi'
import { Translator } from './translator'

export type LangRole = Expand<
  StrapiBase & {
    role: 'en_nl' | 'en_tr' | 'nl_en' | 'nl_tr' | 'tr_en' | 'tr_nl'
    translators?: Array<Translator>
  }
>
