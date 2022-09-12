import { Art } from './art'
import { Expand, TranslationStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'

export type CollectionBase = {
  title: string
  slug: string
  description: string
  translationStatus: TranslationStatus
  locale: StrapiLocale
}

type CollectionRelation = {
  image?: UploadFile | null
  arts?: Array<Art>
  localizations?: Array<Collection>
}

type CollectionRelationInput = {
  image: Blob
  arts?: Array<number>
}

export type CollectionCreateInput = Expand<
  Omit<CollectionBase, 'slug' | 'translationStatus'> & CollectionRelationInput
>

export type CollectionUpdateInput = Expand<
  Partial<Omit<CollectionBase, 'locale'> & CollectionRelationInput>
>

export type CollectionLocalizeInput = Pick<
  CollectionBase,
  'title' | 'description' | 'locale'
>

export type Collection = Expand<
  StrapiCore & CollectionBase & CollectionRelation
>
