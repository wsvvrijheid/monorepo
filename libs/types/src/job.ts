import { Project, RawProject } from './project'
import { StrapiEntity, StrapiRawEntity } from './strapi'

export type RawJob = {
  id: number
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string
  description_nl: string
  description_tr: string
  project: StrapiRawEntity<RawProject>
}

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
