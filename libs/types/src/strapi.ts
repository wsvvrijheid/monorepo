import { UnionToIntersection } from 'type-fest'

import { Activity, ActivityLocalizeInput } from './activity'
import { Announcement, AnnouncementLocalizeInput } from './announcement'
import { Applicant } from './applicant'
import { Application } from './application'
import { Art, ArtLocalizeInput } from './art'
import { Blog, BlogLocalizeInput } from './blog'
import { Category } from './category'
import { Collection } from './collection'
import { Comment } from './comment'
import { ApprovalStatus, Expand } from './common'
import { Competition, CompetitionLocalizeInput } from './competition'
import { Donate } from './donate'
import { Feedback } from './feedback'
import { UploadFile } from './file'
import { Hashtag, HashtagLocalizeInput } from './hashtag'
import { Job } from './job'
import { LangRole } from './lang-role'
import { StrapiLocale } from './locale'
import { Me } from './me'
import { Mention } from './mention'
import { Platform } from './platform'
import { Post, PostLocalizeInput } from './post'
import { Privacy } from './privacy'
import { RecommendedTopic } from './recommended-topic'
import { RecommendedTweet } from './recommended-tweet'
import { Tag } from './tag'
import { Term } from './term'
import { Topic } from './topic'
import { Trend } from './trend'
import { User } from './user'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

/**
 * MODEL TYPES
 */
export type PublicationState = 'preview' | 'live'

export type StrapiBase = {
  id: number
  createdAt: string
  updatedAt: string | null
  publishedAt: string | null
  translates?: StrapiLocale[]
}

export type StrapiEntityBase = {
  title: string
  slug: string
  description: string
  content: string
  approvalStatus: ApprovalStatus
  locale: StrapiLocale
}

export type StrapiModel =
  | Activity
  | Announcement
  | Applicant
  | Application
  | Art
  | Blog
  | Category
  | Collection
  | Comment
  | Competition
  | Donate
  | Feedback
  | Hashtag
  | Job
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
  | Topic
  | Trend
  | UploadFile
  | User
  | Volunteer
  | Vote

export type StrapiAllModels = Expand<UnionToIntersection<StrapiModel>>

export type StrapiModelKeys = keyof StrapiAllModels

/**
 * STRAPI RESPONSE TYPES
 */
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

export type StrapiSingleResponseData<T extends StrapiModel> = T
export type StrapiCollectionResponseData<T extends StrapiModel[]> = T

export type StrapiSingleResponse<T extends StrapiModel> = {
  data: StrapiSingleResponseData<T>
  meta: Record<string, unknown>
}
export type StrapiMutationResponse<T extends StrapiModel> =
  StrapiSingleResponse<T>

export type StrapiCollectionResponse<T extends StrapiModel[]> = {
  data: StrapiCollectionResponseData<T>
  meta: StrapiMeta
}

/**
 * STRAPI API URL TYPES
 */
export type StrapiEmailUrl = 'email'
export type StrapiProviders = 'instagram' | 'facebook' | 'google' | 'twitter'
export type StrapiSingleUrl = 'term' | 'privacy' | 'trend' | 'topic'
export type StrapiAuthUrl =
  | 'auth/local/register'
  | 'auth/local'
  | `connect/${StrapiProviders}/callback`
export type StrapiCollectionUrl =
  | 'activities'
  | 'announcements'
  | 'applicants'
  | 'arts'
  | 'blogs'
  | 'categories'
  | 'collections'
  | 'comments'
  | 'competitions'
  | 'donates'
  | 'feedbacks'
  | 'hashtags'
  | 'jobs'
  | 'lang-roles'
  | 'me'
  | 'mentions'
  | 'platforms'
  | 'posts'
  | 'recommended-topics'
  | 'recommended-tweets'
  | 'saved-tweets'
  | 'tags'
  | 'timelines'
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

/**
 * TRANSLATION TYPES
 */
export type StrapiTranslatableModel =
  | Activity
  | Announcement
  | Art
  | Blog
  | Competition
  | Hashtag
  | Post

export type StrapiLocalizeInput =
  | ActivityLocalizeInput
  | AnnouncementLocalizeInput
  | ArtLocalizeInput
  | BlogLocalizeInput
  | CompetitionLocalizeInput
  | HashtagLocalizeInput
  | PostLocalizeInput

export type StrapiFormValue =
  | Blob
  | Blob[]
  | Date
  | JSON
  | boolean
  | null
  | number
  | number[]
  | string
  | string[]

export type StrapiMutationInput = { [key in string]?: StrapiFormValue }
