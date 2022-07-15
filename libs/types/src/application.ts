import { Applicant, RawApplicant } from './applicant'
import { Competition, RawCompetition } from './competition'
import { RawUploadFile, UploadFile } from './file'
import { RawTag, Tag } from './tag'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'
import { RawVote, Vote } from './vote'
import { JuriVote, RawJuriVote } from './juri-vote'

export type RawApplication = {
  id: number
  title: string
  slug: string
  content: string
  image: StrapiRawEntity<RawUploadFile>
  competition: StrapiRawEntity<RawCompetition>
  applicant: StrapiRawEntity<RawApplicant>
  votes: StrapiRawCollection<RawVote>
  juriVotes: StrapiRawCollection<RawJuriVote>
  tags: StrapiRawCollection<RawTag>
}

export type Application = {
  id: number
  title: string
  slug: string
  content: string
  image: StrapiEntity<UploadFile>
  competition: StrapiEntity<Competition>
  applicant: StrapiEntity<Applicant>
  votes: StrapiCollection<Vote>
  juriVotes: StrapiCollection<JuriVote>
  tags: StrapiCollection<Tag>
}
