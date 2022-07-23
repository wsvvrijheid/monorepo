import { Project } from './project'
import { StrapiCore } from './strapi'

export type Job = {
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string | null
  description_nl: string | null
  description_tr: string | null
  project?: Project
} & StrapiCore
