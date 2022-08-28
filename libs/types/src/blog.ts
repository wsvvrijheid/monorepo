import { Author } from './author'
import { Category } from './category'
import { Comment } from './comment'
import { ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'
import { User } from './user'

export type Blog = {
  title: string
  slug: string
  description: string | null
  content: string
  image?: UploadFile
  status: ModelStatus
  likes: number | null
  views: number
  author?: Author
  categories?: Array<Category>
  tags?: Array<Tag>
  likers?: Array<User>
  comments?: Array<Comment>
  locale: StrapiLocale
  localizations?: Array<Blog>
} & StrapiCore
