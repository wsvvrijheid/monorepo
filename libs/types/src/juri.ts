import { StrapiCollection, StrapiEntity } from './strapi'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type Juri = {
  id: number
  votes: StrapiCollection<Vote>
  volunteer: StrapiEntity<Volunteer>
}
