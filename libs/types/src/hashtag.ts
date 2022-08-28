import { Category } from './category'
import { ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { Mention } from './mention'
import { Post } from './post'
import { StrapiCore } from './strapi'
import { Tweet } from './tweet'

export type Hashtag = {
  title: string
  slug: string
  description: string | null
  content: string
  status: ModelStatus
  image?: UploadFile
  hashtag: string
  hashtagExtra: string | null
  date: string
  tweets?: Array<Tweet> | null
  posts?: Array<Post>
  categories?: Array<Category>
  mentions?: Array<Mention>
  locale: StrapiLocale
  localizations?: Array<Hashtag>
} & StrapiCore
