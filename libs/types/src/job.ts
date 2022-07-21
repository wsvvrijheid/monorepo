import { Project } from './project'
import { StrapiEntity } from './strapi'

export type Job = {
  id: string
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string
  description_nl: string
  description_tr: string
  project: StrapiEntity<Project>
}
