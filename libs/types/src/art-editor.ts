import { ArtFeedback } from './art-feedback'
import { StrapiCollection, StrapiEntity } from './strapi'
import { Volunteer } from './volunteer'

export type ArtEditor = {
  id: number
  feedbacks: StrapiCollection<ArtFeedback>
  volunteer: StrapiEntity<Volunteer>
}
