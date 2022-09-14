import { Application } from './application'
import { Art } from './art'
import { Expand, PickRequired } from './common'
import { StrapiBase } from './strapi'
import { User } from './user'

export type VoteBase = {
  value: number
}

type VoteRelation = {
  voter?: User
  jury?: User
  application?: Application | null
  art?: Art | null
}

type VoteRelationInput = {
  voter?: number
  jury?: number
  application?: number
  art?: number
}

export type VoteCreateApplicationInput = Expand<
  VoteBase & PickRequired<VoteRelationInput, 'voter' | 'application'>
>

export type VoteCreateArtInput = Expand<
  VoteBase & PickRequired<VoteRelationInput, 'voter' | 'art'>
>

export type VoteCreateApplicationJuryInput = Expand<
  VoteBase & PickRequired<VoteRelationInput, 'jury' | 'application'>
>

export type VoteCreateArtJuryInput = Expand<
  VoteBase & PickRequired<VoteRelationInput, 'jury' | 'art'>
>

export type Vote = Expand<StrapiBase & VoteBase & VoteRelation>
