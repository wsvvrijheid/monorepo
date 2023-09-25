import { Profile } from './profile'
import { StrapiBase } from './strapi'

export type LangRole = StrapiBase & {
  role: 'en_nl' | 'en_tr' | 'nl_en' | 'nl_tr' | 'tr_en' | 'tr_nl'
  translators?: Array<Profile>
}
