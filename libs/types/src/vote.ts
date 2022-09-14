import { Application } from './application'
import { Expand } from './common'
import { StrapiBase } from './strapi'
import { User } from './user'
import { Volunteer } from './volunteer'

export type VoteBase = {
  value: number
}

type VoteRelation = {
  voter?: User
  jury?: Volunteer
  application?: Application
}

type VoteRelationInput = {
  voter: number
  application: number
}

export type VoteCreateInput = Expand<VoteBase & VoteRelationInput>

export type Vote = Expand<StrapiBase & VoteBase & VoteRelation>
