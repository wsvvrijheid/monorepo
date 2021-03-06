import { RawUploadFile, UploadFile } from './file'
import { Job, RawJob } from './job'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'

export type RawProject = {
  id: number
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
  image: StrapiRawEntity<RawUploadFile>
  jobs: StrapiRawCollection<RawJob>
}

export type Project = {
  id: string
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
  image: StrapiEntity<UploadFile>
  jobs: StrapiCollection<Job>
}
