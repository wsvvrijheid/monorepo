import { Application } from './application'
import { Category } from './category'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'

type CompetitionBase = StrapiEntityBase & {
  date: string
  deadline: string
}

type CompetitionRelation = {
  image?: UploadFile
  applications?: Array<Application>
  categories?: Array<Category>
  localizations?: Array<Competition>
}

type CompetitionRelationInput = {
  image: Blob
  applications?: Array<number>
  categories?: Array<number>
}

export type CompetitionCreateInput = Expand<
  { publishedAt?: string | null } & Omit<CompetitionBase, 'translationStatus'> &
    Omit<CompetitionRelationInput, 'applications'>
>

export type CompetitionUpdateInput = Expand<
  { publishedAt?: string | null } & Partial<
    Omit<CompetitionBase, 'locale'> & CompetitionRelationInput
  >
>

export type CompetitionLocalizeInput = Omit<
  CompetitionBase,
  'approvalStatus' | 'likes' | 'views'
>

export type Competition = StrapiBase & CompetitionBase & CompetitionRelation
