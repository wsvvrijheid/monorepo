import { Platform } from './platform'
import { StrapiCore } from './strapi'

export type Job = {
  slug: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string | null
  description_nl: string | null
  description_tr: string | null
  platform?: Platform
} & StrapiCore
