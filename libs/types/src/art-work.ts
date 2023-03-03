import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
import { Expand } from './common'
import { Feedback } from './feedback'
import { UploadFile } from './file'
import { StrapiBase, StrapiCreatorRelation, StrapiEntityBase } from './strapi'
import { Tag } from './tag'
import { User } from './user'
import { Vote } from './vote'

type ArtWorkBase = StrapiEntityBase & {
  likes: number
  views: number
  title_tr: string | null
  title_en: string | null
  title_nl: string | null
  description_tr: string | null
  description_en: string | null
  description_nl: string | null
  content_tr: string | null
  content_en: string | null
  content_nl: string | null
}

type ArtWorkRelation = {
  artist?: User
  categories?: Array<Category>
  collection?: Collection | null
  comments?: Array<Comment>
  feedbacks?: Array<Feedback>
  image?: UploadFile
  likers?: Array<User>
  tags?: Array<Tag>
  votes?: Array<Vote>
}

type ArtWorkRelationInput = {
  artist: number
  categories?: Array<number>
  collection?: number | null
  comments?: Array<number>
  feedbacks?: Array<number>
  image: File
  likers?: Array<number>
  tags?: Array<number>
  votes?: Array<number>
}

export type ArtWorkCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    ArtWorkBase,
    'approvalStatus' | 'likes' | 'views'
  > &
    Pick<ArtWorkRelationInput, 'categories' | 'collection' | 'tags'> & {
      token: string
    }
>

export type ArtWorkUpdateInput = Expand<
  { publishedAt?: Date | string | null } & Partial<
    Omit<ArtWorkBase, 'locale'> & ArtWorkRelationInput
  > & { token: string }
>

export type ArtWork = StrapiBase &
  ArtWorkBase &
  ArtWorkRelation &
  StrapiCreatorRelation
