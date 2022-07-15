import { Category, RawCategory } from './category'
import { RawUploadFile, UploadFile } from './file'
import { RawTag, Tag } from './tag'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'

export type RawActivity = {
  id: number
  content: string
  createdAt: string
  date: string
  description: string
  locale: string
  publishedAt: string
  slug: string
  title: string
  updatedAt: string
  image: StrapiRawEntity<RawUploadFile>
  categories: StrapiRawCollection<RawCategory>
  tags: StrapiRawCollection<RawTag>
  localizations: StrapiRawCollection<RawActivity>
}

export type Activity = {
  id: number
  content: string
  createdAt: string
  date: string
  description: string
  locale: string
  publishedAt: string
  slug: string
  title: string
  updatedAt: string
  image: StrapiEntity<UploadFile>
  categories: StrapiCollection<Category>
  tags: StrapiCollection<Tag>
  localizations: StrapiCollection<Activity>
}
