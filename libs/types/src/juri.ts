import { StrapiCore } from './strapi'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type Juri = {
  votes?: Array<Vote>
  volunteer?: Volunteer
} & StrapiCore
