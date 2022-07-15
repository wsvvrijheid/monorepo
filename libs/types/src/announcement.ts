import { Category, RawCategory } from './category'
import { RawUploadFile, UploadFile } from './file'
import { RawTag, Tag } from './tag'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'

export type RawAnnouncement = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  image: StrapiRawEntity<RawUploadFile>
  date: string
  dateEnd: string
  locale: string
  categories: StrapiRawCollection<RawCategory>
  tags: StrapiRawCollection<RawTag>
  localizations: StrapiRawCollection<RawAnnouncement>
  createdAt: string
  publishedAt: string
  updatedAt: string
}

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
