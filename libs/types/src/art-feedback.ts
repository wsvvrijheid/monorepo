import { Art } from './art'
import { ArtEditor } from './art-editor'
import { StrapiEntity } from './strapi'

export type ArtFeedback = {
  id: number
  message: string
  point: number
  type: 'approve' | 'reject'
  art: StrapiEntity<Art>
  editor: StrapiEntity<ArtEditor>
}
