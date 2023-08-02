import { UnionToIntersection } from 'type-fest'

import { AccountStats } from './account-stats'
import {
  Activity,
  ActivityCreateInput,
  ActivityLocalizeInput,
  ActivityUpdateInput,
} from './activity'
import {
  Announcement,
  AnnouncementCreateInput,
  AnnouncementLocalizeInput,
  AnnouncementUpdateInput,
} from './announcement'
import { Applicant } from './applicant'
import {
  Application,
  ApplicationCreateInput,
  ApplicationUpdateInput,
} from './application'
import { Art, ArtCreateInput, ArtLocalizeInput, ArtUpdateInput } from './art'
import {
  Blog,
  BlogCreateInput,
  BlogLocalizeInput,
  BlogUpdateInput,
} from './blog'
import { Category, CategoryCreateInput } from './category'
import {
  Collection,
  CollectionCreateInput,
  CollectionUpdateInput,
} from './collection'
import {
  Comment,
  CommentArtCreateInput,
  CommentBlogCreateInput,
} from './comment'
import { ApprovalStatus, Expand } from './common'
import {
  Competition,
  CompetitionCreateInput,
  CompetitionLocalizeInput,
  CompetitionUpdateInput,
} from './competition'
import { Course, CourseCreateInput, CourseUpdateInput } from './course'
import {
  CourseApplication,
  CourseApplicationCreateInput,
} from './course-application'
import { Donation, DonationCreateInput, DonationUpdateInput } from './donation'
import { EmailCreateInput } from './email'
import {
  Feedback,
  FeedbackApplicationCreateInput,
  FeedbackArtCreateInput,
} from './feedback'
import { UploadFile } from './file'
import {
  Hashtag,
  HashtagCreateInput,
  HashtagLocalizeInput,
  HashtagUpdateInput,
} from './hashtag'
import { Job, JobCreateInput } from './job'
import { LangRole } from './lang-role'
import { StrapiLocale } from './locale'
import { Me } from './me'
import { Mention, MentionCreateInput } from './mention'
import { Platform } from './platform'
import {
  Post,
  PostCreateInput,
  PostLocalizeInput,
  PostUpdateInput,
} from './post'
import { Privacy } from './privacy'
import {
  RecommendedTopic,
  RecommendedTopicCreateInput,
} from './recommended-topic'
import {
  RecommendedTweet,
  RecommendedTweetCreateInput,
} from './recommended-tweet'
import { Tag, TagCreateInput } from './tag'
import { Term } from './term'
import { Timeline, TimelineCreateInput } from './timeline'
import { Topic } from './topic'
import { Trend } from './trend'
import { User } from './user'
import {
  Volunteer,
  VolunteerCreateInput,
  VolunteerUpdateInput,
} from './volunteer'
import {
  Vote,
  VoteCreateApplicationInput,
  VoteCreateApplicationJuryInput,
  VoteCreateArtInput,
  VoteCreateArtJuryInput,
} from './vote'

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
  description: string | null
  content: string | null
  approvalStatus: ApprovalStatus
  locale: StrapiLocale
}

export type StrapiCreatorRelation = {
  approver?: User | null
  creator?: User | null
}

export type StrapiModel =
  | AccountStats
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
  | Course
  | CourseApplication
  | Donation
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
  | Timeline
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

export type StrapiResponse<T extends StrapiModel> =
  | StrapiSingleResponse<T>
  | StrapiCollectionResponse<T[]>

/**
 * STRAPI API URL TYPES
 */
export type StrapiProviders = 'instagram' | 'facebook' | 'google' | 'twitter'

export type StrapiEmailEndpoint = 'email'
export type StrapiEmailUrl = `api/${StrapiEmailEndpoint}`

export type StrapiSingleEndpoint =
  | 'term'
  | 'privacy'
  | 'trend'
  | 'topic'
  | 'topic/sync'
  | 'users/me'
export type StrapiSingleUrl = `api/${StrapiSingleEndpoint}`

export type StrapiAuthEndpoint =
  | 'auth/local/register'
  | 'auth/local'
  | `connect/${StrapiProviders}/callback`
export type StrapiAuthUrl = `api/${StrapiAuthEndpoint}`

export type StrapiCollectionEndpoint =
  | 'account-statistics'
  | 'activities'
  | 'announcements'
  | 'applicants'
  | 'arts'
  | 'blogs'
  | 'authors'
  | 'categories'
  | 'collections'
  | 'comments'
  | 'competitions'
  | 'course-applications'
  | 'courses'
  | 'donates'
  | 'donates/email'
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
  | 'user-statistics/get-user-stats'
  | 'user-statistics/get-stats'
  | 'users'
  | 'roles'
  | 'volunteers'
  | 'votes'
export type StrapiCollectionUrl = `api/${StrapiCollectionEndpoint}`

export type StrapiUrl =
  | StrapiSingleUrl
  | StrapiCollectionUrl
  | StrapiAuthUrl
  | StrapiEmailUrl

export type StrapiLocalizeInput =
  | ActivityLocalizeInput
  | AnnouncementLocalizeInput
  | ArtLocalizeInput
  | BlogLocalizeInput
  | CompetitionLocalizeInput
  | HashtagLocalizeInput
  | PostLocalizeInput

export type StrapiFormValue =
  | File
  | File[]
  | Date
  | JSON
  | boolean
  | null
  | number
  | number[]
  | string
  | string[]

export type StrapiCreateInput =
  | ActivityCreateInput
  | AnnouncementCreateInput
  | ApplicationCreateInput
  | ArtCreateInput
  | BlogCreateInput
  | CategoryCreateInput
  | CollectionCreateInput
  | CommentArtCreateInput
  | CommentBlogCreateInput
  | CompetitionCreateInput
  | CourseApplicationCreateInput
  | CourseCreateInput
  | DonationCreateInput
  | EmailCreateInput
  | FeedbackApplicationCreateInput
  | FeedbackArtCreateInput
  | HashtagCreateInput
  | JobCreateInput
  | MentionCreateInput
  | PostCreateInput
  | RecommendedTopicCreateInput
  | RecommendedTweetCreateInput
  | TagCreateInput
  | TimelineCreateInput
  | VolunteerCreateInput
  | VoteCreateApplicationInput
  | VoteCreateApplicationJuryInput
  | VoteCreateArtInput
  | VoteCreateArtJuryInput

export type StrapiUpdateInput =
  | ActivityUpdateInput
  | AnnouncementUpdateInput
  | ApplicationUpdateInput
  | ArtUpdateInput
  | BlogUpdateInput
  | CollectionUpdateInput
  | CompetitionUpdateInput
  | CourseUpdateInput
  | DonationUpdateInput
  | HashtagUpdateInput
  | PostUpdateInput
  | VolunteerUpdateInput
