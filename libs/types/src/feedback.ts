import { Application } from './application'
import { Art } from './art'
import { ApprovalStatus, Expand, PickRequired } from './common'
import { StrapiBase } from './strapi'
import { User } from './user'

type FeedbackBase = {
  message: string
  point: number
  status: ApprovalStatus
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
  { publishedAt?: Date | string | null } & FeedbackBase &
    PickRequired<FeedbackRelationInput, 'art'> & { token: string }
>

export type FeedbackApplicationCreateInput = Expand<
  { publishedAt?: Date | string | null } & FeedbackBase &
    PickRequired<FeedbackRelationInput, 'editor' | 'application'> & {
      token: string
    }
>

export type Feedback = StrapiBase & FeedbackBase & FeedbackRelation
