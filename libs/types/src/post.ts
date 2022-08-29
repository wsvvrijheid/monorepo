import { ModelStatus } from './common'
import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'
import { Translator } from './translator'
import { User } from './user'

export type Post = {
  title: string
  description: string
  content: string | null
  status: ModelStatus
  capsStatus: ModelStatus
  image?: UploadFile
  twitterMedia?: string | null
  hashtag?: Hashtag
  tags?: Array<Tag>
  translator?: Translator | null
  creator?: User | null
  reviewer?: User | null
  locale: StrapiLocale
  localizations?: Array<Post>
} & StrapiCore
