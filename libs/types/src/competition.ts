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
  Omit<CompetitionBase, 'translationStatus'> &
    Omit<CompetitionRelationInput, 'applications'>
>

export type CompetitionUpdateInput = Expand<
  Partial<Omit<CompetitionBase, 'locale'> & CompetitionRelationInput>
>

export type Competition = StrapiBase & CompetitionBase & CompetitionRelation
