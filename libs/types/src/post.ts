import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'
import { Translator } from './translator'
import { User } from './user'

export type Post = {
  text: string
  twitterMedia?: string | null
  locale: StrapiLocale
  creator?: User | null
  hashtag?: Hashtag
  image?: UploadFile
  tags?: Array<Tag>
  translator?: Translator | null
  localizations?: Array<Post>
} & StrapiCore
