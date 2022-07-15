import { RawUploadFile, UploadFile } from './file'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'

export type RawTerm = {
  id: number
  title: string
  slug: string
  content: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiRawEntity<RawUploadFile>
  localizations: StrapiRawCollection<RawTerm>
}

export type Term = {
  id: number
  title: string
  slug: string
  content: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiEntity<UploadFile>
  localizations: StrapiCollection<Term>
}
