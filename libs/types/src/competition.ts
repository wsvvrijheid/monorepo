import { Application } from './application'
import { Category } from './category'
import { Expand, ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'

type CompetitionBase = {
  title: string
  slug: string
  description: string
  content: string
  status: ModelStatus
  date: string
  deadline: string
  locale: StrapiLocale
}

type CompetitionRelation = {
  image?: UploadFile
  applications?: Array<Application>
  categories?: Array<Category>
  localizations?: Array<Competition>
}

type CompetitionRelationInput = {
  image: Blob
  applications?: number[]
  categories?: number[]
}

export type CompetitionCreateInput = Expand<
  Omit<CompetitionBase, 'status'> & CompetitionRelationInput
>

export type CompetitionUpdateInput = Expand<
  Partial<Omit<CompetitionBase, 'locale'> & CompetitionRelationInput>
>

export type Competition = Expand<
  StrapiCore & CompetitionBase & CompetitionRelation
>
