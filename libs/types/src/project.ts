import { UploadFile } from './file'
import { Job } from './job'
import { StrapiCore } from './strapi'

export type Project = {
  code: string
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
  image?: UploadFile
  jobs?: Array<Job>
} & StrapiCore
