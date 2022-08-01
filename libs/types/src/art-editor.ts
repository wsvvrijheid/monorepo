import { ArtFeedback } from './art-feedback'
import { StrapiCore } from './strapi'
import { Volunteer } from './volunteer'

export type ArtEditor = {
  feedbacks?: Array<ArtFeedback>
  volunteer?: Volunteer
} & StrapiCore
