import { StrapiCore } from './strapi'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type Jury = {
  votes?: Array<Vote>
  volunteer?: Volunteer
} & StrapiCore
