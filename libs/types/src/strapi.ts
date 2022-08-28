import { Activity } from './activity'
import { Announcement } from './announcement'
import { Applicant } from './applicant'
import { Application } from './application'
import { Art } from './art'
import { ArtEditor } from './art-editor'
import { ArtFeedback } from './art-feedback'
import { Artist } from './artist'
import { Author } from './author'
import { Blog } from './blog'
import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
import { Competition } from './competition'
import { Donate } from './donate'
import { UploadFile } from './file'
import { Hashtag } from './hashtag'
import { Job } from './job'
import { Jury } from './jury'
import { JuryVote } from './jury-vote'
import { LangRole } from './lang-role'
import { Me } from './me'
import { Mention } from './mention'
import { Platform } from './platform'
import { Post } from './post'
import { Privacy } from './privacy'
import { Tag } from './tag'
import { Term } from './term'
import { Translator } from './translator'
import { Trend } from './trend'
import { User } from './user'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type PublicationState = 'LIVE' | 'PREVIEW'

export type StrapiCore = {
  id: number
  createdAt: string
  updatedAt: string | null
  publishedAt: string | null
}

export type StrapiModel =
  | Activity
  | Announcement
  | Applicant
  | Application
  | ArtEditor
  | ArtFeedback
  | Art
  | Artist
  | Author
  | Blog
  | Category
  | Collection
  | Comment
  | Competition
  | Donate
  | UploadFile
  | Hashtag
  | Job
  | JuryVote
  | Jury
  | LangRole
  | Me
  | Mention
  | Post
  | Privacy
  | Platform
  | Tag
  | Term
  | Translator
  | Trend
  | User
  | Volunteer
  | Vote

export type StrapiAllModels = Activity &
  Announcement &
  Applicant &
  Application &
  ArtEditor &
  ArtFeedback &
  Art &
  Artist &
  Author &
  Blog &
  Category &
  Collection &
  Comment &
  Competition &
  Donate &
  UploadFile &
  Hashtag &
  Job &
  JuryVote &
  Jury &
  LangRole &
  Me &
  Mention &
  Post &
  Privacy &
  Platform &
  Tag &
  Term &
  Translator &
  Trend &
  User &
  Volunteer &
  Vote

export type StrapiModelKeys = keyof StrapiAllModels

export type Pagination = {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

export type PaginationArg =
  | { limit: number; start: number }
  | { page: number; pageSize: number }

export type StrapiMeta = {
  pagination: Pagination
}

export type StrapiResponseData<T extends StrapiModel | Array<StrapiModel>> = T

export type StrapiResponse<T extends StrapiModel | Array<StrapiModel>> = {
  data: StrapiResponseData<T>
} & {
  meta: StrapiMeta
}

export type StrapiTranslatableModel =
  | Activity
  | Announcement
  | Art
  | Blog
  | Competition
  | Hashtag
  | Post
