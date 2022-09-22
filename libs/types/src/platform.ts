import { Expand } from './common'
import { UploadFile } from './file'
import { Job } from './job'
import { StrapiBase } from './strapi'

export type PlatformBase = {
  slug: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string
  description_nl: string
  description_tr: string
  content_en: string
  content_nl: string
  content_tr: string
  link: string
}

type PlatformRelation = {
  image?: UploadFile
  jobs?: Array<Job>
}

export type Platform = Expand<StrapiBase & PlatformBase & PlatformRelation>
