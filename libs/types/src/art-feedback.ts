import { Art, RawArt } from './art'
import { ArtEditor, RawArtEditor } from './art-editor'
import { StrapiEntity, StrapiRawEntity } from './strapi'

export type RawArtFeedback = {
  id: number
  message: string
  point: number
  type: 'approve' | 'reject'
  art: StrapiRawEntity<RawArt>
  editor: StrapiRawEntity<RawArtEditor>
}

export type ArtFeedback = {
  id: number
  message: string
  point: number
  type: 'approve' | 'reject'
  art: StrapiEntity<Art>
  editor: StrapiEntity<ArtEditor>
}
