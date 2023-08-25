import { Expand } from './common'
import { UploadFile } from './file'
import { Job } from './job'
import { StrapiBase } from './strapi'
import { Volunteer } from './volunteer'

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
  volunteers?: Array<Volunteer>
}

type PlatformRelationInput = {
  volunteers?: Array<number>
}

export type PlatformUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<PlatformBase> &
    PlatformRelationInput
>

export type Platform = StrapiBase & PlatformBase & PlatformRelation & PlatformRelationInput
