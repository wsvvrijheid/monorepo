import { Category } from './category'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { Mention } from './mention'
import { Post } from './post'
import { StrapiCore } from './strapi'
import { Tweet } from './tweet'

export type Hashtag = {
  content: string
  date: string
  description: string | null
  hashtag: string
  hashtag_extra: string | null
  twitterMedia?: string | null
  locale: StrapiLocale
  slug: string
  title: string
  tweets?: Array<Tweet> | null
  image?: UploadFile
  mentions?: Array<Mention>
  posts?: Array<Post>
  categories?: Array<Category>
  localizations?: Array<Hashtag>
} & StrapiCore
