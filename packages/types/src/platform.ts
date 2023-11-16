import { Expand } from './common'
import { Contact } from './contact'
import { UploadFile } from './file'
import { Job } from './job'
import { Profile } from './profile'
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
  contact?: Contact | null
}

type PlatformRelation = {
  image?: UploadFile
  jobs?: Array<Job>
  volunteers?: Array<Profile>
}

type PlatformRelationInput = {
  volunteers?: Array<number>
}

export type PlatformUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<PlatformBase> &
    PlatformRelationInput
>

export type Platform = StrapiBase & PlatformBase & PlatformRelation
