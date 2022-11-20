import { Applicant } from './applicant'
import { Art } from './art'
import { Blog } from './blog'
import { Comment } from './comment'
import { Expand } from './common'
import { Feedback } from './feedback'
import { UploadFile } from './file'
import { LangRole } from './lang-role'
import { Post } from './post'
import { RecommendedTopic } from './recommended-topic'
import { RecommendedTweet } from './recommended-tweet'
import { Role } from './role'
import { StrapiBase } from './strapi'
import { Timeline } from './timeline'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type UserBase = {
  name: string | null
  email: string
  username: string
  blocked: boolean
  confirmed: boolean
  provider: string
  langRoles?: Array<LangRole>
}

type UserRelation = {
  role?: Role
  avatar?: UploadFile | null
  applicant?: Applicant | null
  arts?: Array<Art>
  blogs?: Array<Blog>
  comments?: Array<Comment>
  createdTimelines?: Array<Timeline>
  feedbacks?: Array<Feedback>
  juryVotes?: Array<Vote>
  langRoles?: Array<LangRole>
  likedArts?: Array<Art>
  likedBlogs?: Array<Blog>
  posts?: Array<Post>
  recommendedTweets?: Array<RecommendedTweet>
  reviewedPosts?: Array<Post>
  timelines?: Array<Timeline>
  topics?: Array<RecommendedTopic>
  volunteer?: Volunteer | null
  votes?: Array<Vote>
}

type UserRelationInput = {
  role?: number
  avatar?: Blob
  applicant?: number
  arts?: Array<number>
  blogs?: Array<number>
  comments?: Array<number>
  createdTimelines?: Array<number>
  feedbacks?: Array<number>
  juryVotes?: Array<number>
  likedArts?: Array<number>
  likedBlogs?: Array<number>
  posts?: Array<number>
  recommendedTweets?: Array<number>
  reviewedPosts?: Array<number>
  savedTweets?: Array<number>
  timelines?: Array<number>
  topics?: Array<number>
  volunteer?: number | null
  votes?: Array<number>
}

export type UpdateUserInput = Expand<
  Partial<Omit<UserBase, 'provider'> & UserRelationInput>
>

export type User = Omit<StrapiBase, 'publishedAt'> & UserBase & UserRelation
