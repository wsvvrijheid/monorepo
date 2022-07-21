import { StrapiCollection } from './strapi'
import { Translator } from './translator'

export type LangRole = {
  id: number
  role: 'en_nl' | 'en_tr' | 'nl_en' | 'nl_tr' | 'tr_en' | 'tr_nl'
  translators: StrapiCollection<Translator>
  publishedAt: string
  updatedAt: string
  createdAt: string
}
