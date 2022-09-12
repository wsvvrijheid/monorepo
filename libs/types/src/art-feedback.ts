import { SetRequired } from 'type-fest'

import { Art } from './art'
import { ArtEditor } from './art-editor'
import { Expand } from './common'
import { StrapiCore } from './strapi'

type ArtFeedbackBase = {
  message: string
  point: number
  type: 'approve' | 'reject'
}

type ArtFeedbackRelation = {
  art?: Art
  editor?: ArtEditor
}

type ArtFeedbackRelationInput = {
  art?: number
  editor?: number
}

export type ArtFeedbackCreateInput = Expand<
  ArtFeedbackBase & SetRequired<ArtFeedbackRelationInput, 'art' | 'editor'>
>

export type ArtFeedback = Expand<
  StrapiCore & ArtFeedbackBase & ArtFeedbackRelation
>
