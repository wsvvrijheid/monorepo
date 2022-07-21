import { Category } from './category'
import { UploadFile } from './file'
import { StrapiCollection, StrapiEntity } from './strapi'
import { Tag } from './tag'

export type Announcement = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  image: StrapiEntity<UploadFile>
  date: string
  dateEnd: string
  locale: string
  categories: StrapiCollection<Category>
  tags: StrapiCollection<Tag>
  localizations: StrapiCollection<Announcement>
  createdAt: string
  publishedAt: string
  updatedAt: string
}
