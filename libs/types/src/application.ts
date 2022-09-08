import { Applicant } from './applicant'
import { ModelStatus } from './common'
import { Competition } from './competition'
import { UploadFile } from './file'
import { JuryVote } from './jury-vote'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'
import { Vote } from './vote'

export type Application = {
  title: string
  slug: string
  content: string
  status: ModelStatus
  image?: UploadFile
  competition?: Competition
  applicant?: Applicant
  votes?: Array<Vote>
  juryVotes?: Array<JuryVote>
  tags?: Array<Tag>
  locale: StrapiLocale
  localizations?: Array<Application>
} & StrapiCore
