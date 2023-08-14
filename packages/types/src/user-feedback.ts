import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase } from './strapi'
import { User } from './user'

export type UserFeedbackBase = {
  point: number
  image?: UploadFile
  comment: string
}

type UserFeedbackRelation = {
  user?: User
}

type UserFeedbackRelationInput = {
  user?: number
}

export type UserFeedbackCreateInput = Expand<
  { publishedAt?: Date | string | null } & UserFeedbackBase &
    UserFeedbackRelationInput
>

export type UserFeedback = StrapiBase & UserFeedbackBase & UserFeedbackRelation
