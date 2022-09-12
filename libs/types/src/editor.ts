import { Expand } from './common'
import { Feedback } from './feedback'
import { StrapiCore } from './strapi'
import { Volunteer } from './volunteer'

type EditorRelation = {
  feedbacks?: Array<Feedback>
  volunteer?: Volunteer
}

type EditorRelationInput = {
  feedbacks?: number[]
  volunteer: number
}

export type EditorCreateInput = EditorRelationInput

export type Editor = Expand<StrapiCore & EditorRelation>
