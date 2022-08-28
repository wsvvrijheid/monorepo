import { ArtFeedback } from './art-feedback'
import { Artist } from './artist'
import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
import { ModelStatus } from './common'
import { UploadFile } from './file'
import { StrapiLocale } from './locale'
import { StrapiCore } from './strapi'
import { Tag } from './tag'
import { User } from './user'

export type Art = {
  title: string
  slug: string
  description: string | null
  content: string
  images?: Array<UploadFile>
  status: ModelStatus
  isApproved: boolean | null
  isRejected: boolean | null
  likes: number | null
  views: number | null
  artist?: Artist
  categories?: Array<Category>
  tags?: Array<Tag>
  feedbacks?: Array<ArtFeedback>
  likers?: Array<User>
  collection?: Collection | null
  comments?: Array<Comment>
  locale: StrapiLocale
  localizations?: Array<Art>
} & StrapiCore
