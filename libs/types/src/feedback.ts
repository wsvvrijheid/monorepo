import { Application } from './application'
import { Art } from './art'
import { Expand, PickRequired } from './common'
import { StrapiBase } from './strapi'
import { User } from './user'

type FeedbackBase = {
  message: string
  point: number
  status: 'approve' | 'reject'
}

type FeedbackRelation = {
  art?: Art | null
  application?: Application | null
  editor?: User
}

type FeedbackRelationInput = {
  art?: number
  application?: number
  editor?: number
}

export type FeedbackArtCreateInput = Expand<
  FeedbackBase & PickRequired<FeedbackRelationInput, 'editor' | 'art'>
>

export type FeedbackApplicationCreateInput = Expand<
  FeedbackBase & PickRequired<FeedbackRelationInput, 'editor' | 'application'>
>

export type Feedback = StrapiBase & FeedbackBase & FeedbackRelation
