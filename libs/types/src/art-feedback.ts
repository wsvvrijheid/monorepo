import { Art } from './art'
import { ArtEditor } from './art-editor'
import { StrapiCore } from './strapi'

export type ArtFeedback = {
  message: string
  point: number
  type: 'approve' | 'reject'
  art?: Art
  editor?: ArtEditor
} & StrapiCore
