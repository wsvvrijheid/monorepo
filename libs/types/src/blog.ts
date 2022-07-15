import { Author, RawAuthor } from './author'
import { Category, RawCategory } from './category'
import { RawUploadFile, UploadFile } from './file'
import { RawTag, Tag } from './tag'
import { RawUser, User } from './user'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'
import { Comment, RawComment } from './comment'

export type RawBlog = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  image: StrapiRawEntity<RawUploadFile>
  likes: number
  views: number
  locale: string
  author: StrapiRawEntity<RawAuthor>
  categories: StrapiRawCollection<RawCategory>
  tags: StrapiRawCollection<RawTag>
  likers: StrapiRawCollection<RawUser>
  comments: StrapiRawCollection<RawComment>
  localizations: StrapiRawCollection<RawBlog>
  createdAt: string
  publishedAt: string
  updatedAt: string
}

export type Blog = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  image: StrapiEntity<UploadFile>
  likes: number
  views: number
  locale: string
  author: StrapiEntity<Author>
  categories: StrapiCollection<Category>
  tags: StrapiCollection<Tag>
  likers: StrapiCollection<User>
  comments: StrapiCollection<Comment>
  localizations: StrapiCollection<Blog>
  createdAt: string
  publishedAt: string
  updatedAt: string
}
