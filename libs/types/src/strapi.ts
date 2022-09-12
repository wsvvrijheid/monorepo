import { UnionToIntersection } from 'type-fest'

import { Activity } from './activity'
import { Announcement } from './announcement'
import { Applicant } from './applicant'
import { Application } from './application'
import { Art } from './art'
import { Artist } from './artist'
import { Author } from './author'
import { Blog } from './blog'
import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
import { Expand } from './common'
import { Competition } from './competition'
import { Donate } from './donate'
import { Editor } from './editor'
import { Feedback } from './feedback'
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
import { RecommendedTopic } from './recommended-topic'
import { RecommendedTweet } from './recommended-tweet'
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
  | Art
  | Artist
  | Author
  | Blog
  | Category
  | Collection
  | Comment
  | Competition
  | Donate
  | Editor
  | Feedback
  | Hashtag
  | Job
  | Jury
  | JuryVote
  | LangRole
  | Me
  | Mention
  | Platform
  | Post
  | Privacy
  | RecommendedTopic
  | RecommendedTweet
  | Tag
  | Term
  | Translator
  | Trend
  | UploadFile
  | User
  | Volunteer
  | Vote

export type StrapiAllModels = Expand<UnionToIntersection<StrapiModel>>

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
  pagination?: Pagination
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

export type StrapiMutationResponse<T extends StrapiModel> = {
  data: T
  meta: Record<string, unknown>
}

export type StrapiEmailUrl = 'email'
export type StrapiProviders = 'instagram' | 'facebook' | 'google' | 'twitter'
export type StrapiSingleUrl = 'term' | 'privacy' | 'trend'
export type StrapiAuthUrl =
  | 'auth/local/register'
  | 'auth/local'
  | `connect/${StrapiProviders}/callback`
export type StrapiCollectionUrl =
  | 'activities'
  | 'announcements'
  | 'applicants'
  | 'artists'
  | 'arts'
  | 'authors'
  | 'blogs'
  | 'categories'
  | 'collections'
  | 'comments'
  | 'competitions'
  | 'donates'
  | 'editors'
  | 'feedbacks'
  | 'hashtags'
  | 'jobs'
  | 'juries'
  | 'jury-votes'
  | 'lang-roles'
  | 'me'
  | 'mentions'
  | 'news'
  | 'platforms'
  | 'posts'
  | 'recommended-topics'
  | 'recommended-tweets'
  | 'saved-tweets'
  | 'tags'
  | 'timelines'
  | 'translators'
  | 'tweet-users'
  | 'tweets'
  | 'users'
  | 'users/me'
  | 'volunteers'
  | 'votes'

export type StrapiUrl = Expand<`api/${
  | StrapiSingleUrl
  | StrapiCollectionUrl
  | StrapiAuthUrl
  | StrapiEmailUrl}`>

export type StrapiFormValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | number[]
  | Blob
  | Blob[]
  | null

export type StrapiMutationInput = { [key in string]?: StrapiFormValue }
