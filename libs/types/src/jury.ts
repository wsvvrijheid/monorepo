import { Expand } from './common'
import { StrapiBase } from './strapi'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type JuryRelation = {
  votes?: Array<Vote>
  volunteer?: Volunteer
}

export type JuryRelationInput = {
  votes?: Array<number>
  volunteer: number
}

export type JuryCreateInput = JuryRelationInput

export type Jury = Expand<StrapiBase & JuryRelation>
