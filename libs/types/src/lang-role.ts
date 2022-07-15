import { StrapiCollection, StrapiRawCollection } from './strapi'
import { RawTranslator, Translator } from './translator'

export type RawLangRole = {
  id: number
  role: 'en_nl' | 'en_tr' | 'nl_en' | 'nl_tr' | 'tr_en' | 'tr_nl'
  translators: StrapiRawCollection<RawTranslator>
  publishedAt: string
  updatedAt: string
  createdAt: string
}

export type LangRole = {
  id: number
  role: 'en_nl' | 'en_tr' | 'nl_en' | 'nl_tr' | 'tr_en' | 'tr_nl'
  translators: StrapiCollection<Translator>
  publishedAt: string
  updatedAt: string
  createdAt: string
}
