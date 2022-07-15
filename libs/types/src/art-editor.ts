import { RawVolunteer, Volunteer } from './volunteer'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'
import { ArtFeedback, RawArtFeedback } from './art-feedback'

export type RawArtEditor = {
  id: number
  feedbacks: StrapiRawCollection<RawArtFeedback>
  volunteer: StrapiRawEntity<RawVolunteer>
}

export type ArtEditor = {
  id: number
  feedbacks: StrapiCollection<ArtFeedback>
  volunteer: StrapiEntity<Volunteer>
}
