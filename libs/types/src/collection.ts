import { Art, RawArt } from './art'
import { RawUploadFile, UploadFile } from './file'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'

export type RawCollection = {
  id: number
  title: string
  slug: string
  description: string
  image: StrapiRawEntity<RawUploadFile>
  arts: StrapiRawCollection<RawArt>
}

export type Collection = {
  id: number
  title: string
  slug: string
  description: string
  image: StrapiEntity<UploadFile>
  arts: StrapiCollection<Art>
}
