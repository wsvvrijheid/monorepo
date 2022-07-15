import { RawVolunteer, Volunteer } from './volunteer'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'
import { RawVote, Vote } from './vote'

export type RawJuri = {
  id: number
  votes: StrapiRawCollection<RawVote>
  volunteer: StrapiRawEntity<RawVolunteer>
}

export type Juri = {
  id: number
  votes: StrapiCollection<Vote>
  volunteer: StrapiEntity<Volunteer>
}
