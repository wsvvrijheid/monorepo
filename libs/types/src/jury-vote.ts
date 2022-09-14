import { Application } from './application'
import { Expand } from './common'
import { Jury } from './jury'
import { StrapiBase } from './strapi'

export type JuryVoteBase = {
  value: number
}

type JuryVoteRelation = {
  jury?: Jury
  application?: Application
}

type JuryVoteRelationInput = {
  jury: number
  application: number
}

export type JuryVoteCreateInput = Expand<JuryVoteBase & JuryVoteRelationInput>

export type JuryVote = Expand<StrapiBase & JuryVoteBase & JuryVoteRelation>
