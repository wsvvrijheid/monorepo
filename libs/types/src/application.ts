import { Applicant } from './applicant'
import { Expand, TranslationStatus } from './common'
import { Competition } from './competition'
import { UploadFile } from './file'
import { JuryVote } from './jury-vote'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'
import { Vote } from './vote'

export type ApplicationBase = {
  title: string
  slug: string
  content: string
  translationStatus: TranslationStatus
  locale: StrapiLocale
}

type ApplicationRelation = {
  images?: UploadFile[]
  competition?: Competition
  applicant?: Applicant
  votes?: Array<Vote>
  juryVotes?: Array<JuryVote>
  tags?: Array<Tag>
  localizations?: Array<Application>
}

type ApplicationRelationInput = {
  images: Blob[]
  competition: number
  applicant: number
  votes?: number[]
  juryVotes?: number[]
  tags?: number[]
}

export type ApplicationCreateInput = Expand<
  Omit<ApplicationBase, 'translationStatus' | 'slug'> &
    Omit<ApplicationRelationInput, 'votes' | 'juryVotes'>
>

export type ApplicationUpdateInput = Expand<
  Partial<Omit<ApplicationBase, 'locale' | 'slug'>> &
    Partial<ApplicationRelationInput>
>

export type Application = Expand<
  StrapiCore & ApplicationBase & ApplicationRelation
>
