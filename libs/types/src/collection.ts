import { Art } from './art'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCollection, StrapiEntity } from './strapi'

export type Collection = {
  id: number
  title: string
  slug: string
  description: string
  locale: StrapiLocale
  createdAt: string
  updatedAt: string
  publishedAt: string
  image?: StrapiEntity<UploadFile>
  arts?: StrapiCollection<Art>
}
