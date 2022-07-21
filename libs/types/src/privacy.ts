import { UploadFile } from './file'
import { StrapiCollection, StrapiEntity } from './strapi'

export type Privacy = {
  id: number
  title: string
  slug: string
  content: string
  locale: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  image: StrapiEntity<UploadFile>
  localizations: StrapiCollection<Privacy>
}
