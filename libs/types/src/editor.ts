import { Expand } from './common'
import { Feedback } from './feedback'
import { StrapiBase } from './strapi'
import { Volunteer } from './volunteer'

type EditorRelation = {
  feedbacks?: Array<Feedback>
  volunteer?: Volunteer
}

type EditorRelationInput = {
  feedbacks?: Array<number>
  volunteer: number
}

export type EditorCreateInput = EditorRelationInput

export type Editor = Expand<StrapiBase & EditorRelation>
