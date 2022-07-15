import { Category, RawCategory } from './category'
import { RawUploadFile, UploadFile } from './file'
import { Mention, RawMention } from './mention'
import { Post, RawPost } from './post'
import { Tweet } from './tweet'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'

export type RawHashtag = {
  id: number
  content: string
  date: string
  description: string
  hashtag: string
  hashtag_extra: string
  locale: string
  slug: string
  title: string
  tweets: Tweet[]
  image: StrapiRawEntity<RawUploadFile>
  mentions: StrapiRawCollection<RawMention>
  posts: StrapiRawCollection<RawPost>
  categories: StrapiRawCollection<RawCategory>
  localizations: StrapiRawCollection<RawHashtag>
  createdAt: string
  publishedAt: string
  updatedAt: string
}

export type Hashtag = {
  id: number
  content: string
  date: string
  description: string
  hashtag: string
  hashtag_extra: string
  locale: string
  slug: string
  title: string
  tweets: Tweet[]
  image: StrapiEntity<UploadFile>
  mentions: StrapiCollection<Mention>
  posts: StrapiCollection<Post>
  categories: StrapiCollection<Category>
  localizations: StrapiCollection<Hashtag>
  createdAt: string
  publishedAt: string
  updatedAt: string
}
