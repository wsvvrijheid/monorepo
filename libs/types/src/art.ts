import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
import { ApprovalStatus, Expand } from './common'
import { Feedback } from './feedback'
import { UploadFile } from './file'
import { StrapiBase, StrapiEntityBase } from './strapi'
import { Tag } from './tag'
import { User } from './user'
import { Vote } from './vote'

type ArtBase = Expand<
  StrapiEntityBase & {
    approvalStatus: ApprovalStatus // default 'pending'
    likes: number
    views: number
  }
>

type ArtRelation = {
  artist?: User
  categories?: Array<Category>
  collection?: Collection | null
  comments?: Array<Comment>
  feedbacks?: Array<Feedback>
  images?: Array<UploadFile>
  likers?: Array<User>
  localizations?: Array<Art>
  tags?: Array<Tag>
  votes?: Array<Vote>
  juryVotes?: Array<Vote>
}

type ArtRelationInput = {
  artist: number
  categories?: Array<number>
  collection?: number
  comments?: Array<number>
  feedbacks?: Array<number>
  images: Array<Blob>
  likers?: Array<number>
  tags?: Array<number>
  votes?: Array<number>
  juryVotes?: Array<number>
}

export type ArtCreateInput = Expand<
  Omit<ArtBase, 'approvalStatus' | 'translationStatus' | 'likes' | 'views'> &
    Omit<
      ArtRelationInput,
      'comments' | 'feedbacks' | 'likers' | 'votes' | 'juryVotes'
    >
>

export type ArtUpdateInput = Expand<
  Partial<Omit<ArtBase, 'locale'> & ArtRelationInput>
>

export type ArtLocalizeInput = Omit<
  ArtBase,
  'approvalStatus' | 'likes' | 'views'
>

export type Art = Expand<StrapiBase & ArtBase & ArtRelation>
