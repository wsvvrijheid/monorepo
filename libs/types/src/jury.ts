import { Expand } from './common'
import { StrapiCore } from './strapi'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type JuryRelation = {
  votes?: Array<Vote>
  volunteer?: Volunteer
}

export type JuryRelationInput = {
  votes?: number[]
  volunteer: number
}

export type JuryCreateInput = JuryRelationInput

export type Jury = Expand<StrapiCore & JuryRelation>
