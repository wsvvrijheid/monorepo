import { Expand } from './common'
import { Platform } from './platform'
import { StrapiBase } from './strapi'

export type JobBase = {
  slug: string
  name_en: string
  name_nl: string
  name_tr: string
  description_en: string | null
  description_nl: string | null
  description_tr: string | null
}

type JobRelation = {
  platform?: Platform
}

type JobRelationInput = {
  platform: number
}

export type JobCreateInput = Expand<
  { publishedAt?: Date | string | null } & JobBase &
    JobRelationInput & { token: string }
>

export type Job = StrapiBase & JobBase & JobRelation
