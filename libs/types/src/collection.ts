import { Art } from './art'
import { Expand } from './common'
import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'

export type CollectionBase = Omit<StrapiEntityBase, 'content'>

type CollectionRelation = {
  image?: UploadFile
  arts?: Array<Art>
  localizations?: Array<Collection>
}

type CollectionRelationInput = {
  image: Blob
  arts?: Array<number>
}

export type CollectionCreateInput = Expand<
  Omit<CollectionBase, 'translationStatus'> & CollectionRelationInput
>

export type CollectionUpdateInput = Expand<
  Partial<Omit<CollectionBase, 'locale'> & CollectionRelationInput>
>

export type CollectionLocalizeInput = Omit<
  CollectionBase,
  'approvalStatus' | 'likes' | 'views'
>

export type Collection = StrapiBase & CollectionBase & CollectionRelation
