import { Author } from './author'
import { Category } from './category'
import { Comment } from './comment'
import { UploadFile } from './file'
import { StrapiCollection, StrapiEntity } from './strapi'
import { Tag } from './tag'
import { User } from './user'

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
