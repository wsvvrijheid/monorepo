import { Expand } from './common'
import { StrapiCore } from './strapi'
import { Translator } from './translator'

export type LangRole = Expand<
  StrapiCore & {
    role: 'en_nl' | 'en_tr' | 'nl_en' | 'nl_tr' | 'tr_en' | 'tr_nl'
    translators?: Array<Translator>
  }
>
