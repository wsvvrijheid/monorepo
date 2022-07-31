import { Applicant } from './applicant'
import { Competition } from './competition'
import { UploadFile } from './file'
import { JuriVote } from './juri-vote'
import { StrapiCore } from './strapi'
import { Tag } from './tag'
import { Vote } from './vote'

export type Application = {
  title: string
  slug: string
  content: string
  image?: UploadFile
  competition?: Competition
  applicant?: Applicant
  votes?: Array<Vote>
  juriVotes?: Array<JuriVote>
  tags?: Array<Tag>
  localizations?: Array<Application>
} & StrapiCore
