import { Application } from './application'
import { Expand } from './common'
import { StrapiCore } from './strapi'
import { User } from './user'

export type VoteBase = {
  value: number
}

type VoteRelation = {
  voter?: User
  application?: Application
}

type VoteRelationInput = {
  voter: number
  application: number
}

export type VoteCreateInput = Expand<VoteBase & VoteRelationInput>

export type Vote = Expand<StrapiCore & VoteBase & VoteRelation>
