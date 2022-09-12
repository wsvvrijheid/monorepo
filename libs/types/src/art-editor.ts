import { ArtFeedback } from './art-feedback'
import { Expand } from './common'
import { StrapiCore } from './strapi'
import { Volunteer } from './volunteer'

type ArtEditorRelation = {
  feedbacks?: Array<ArtFeedback>
  volunteer?: Volunteer
}

type ArtEditorRelationInput = {
  feedbacks?: number[]
  volunteer: number
}

export type ArtEditorCreateInput = ArtEditorRelationInput

export type ArtEditor = Expand<StrapiCore & ArtEditorRelation>
