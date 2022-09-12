import { SetRequired } from 'type-fest'

import { Application } from './application'
import { Art } from './art'
import { Expand } from './common'
import { Editor } from './editor'
import { StrapiCore } from './strapi'

type FeedbackBase = {
  message: string
  point: number
  type: 'approve' | 'reject'
}

type FeedbackRelation = {
  art?: Art
  application?: Application
  editor?: Editor
}

type FeedbackRelationInput = {
  art?: number
  application?: number
  editor?: number
}

export type FeedbackCreateInput = Expand<
  FeedbackBase & SetRequired<FeedbackRelationInput, 'editor'>
>

export type Feedback = Expand<StrapiCore & FeedbackBase & FeedbackRelation>
