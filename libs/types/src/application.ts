import { Applicant } from './applicant'
import { Competition } from './competition'
import { UploadFile } from './file'
import { JuriVote } from './juri-vote'
import { StrapiCollection, StrapiEntity } from './strapi'
import { Tag } from './tag'
import { Vote } from './vote'

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
