import { ArtFeedback } from './art-feedback'
import { Artist } from './artist'
import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
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
  status: 'pending' | 'rejected' | 'approved'
  previousStatus: 'pending' | 'rejected' | 'approved' | null
  likes: number | null
  views: number | null
  locale: StrapiLocale
  artist?: Artist
  categories?: Array<Category>
  tags?: Array<Tag>
  feedbacks?: Array<ArtFeedback>
  likers?: Array<User>
  collection?: Collection | null
  comments?: Array<Comment>
  localizations?: Array<Art>
} & StrapiCore
