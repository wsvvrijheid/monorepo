import { Applicant } from './applicant'
import { Art } from './art'
import { Artist } from './artist'
import { Blog } from './blog'
import { Comment } from './comment'
import { Expand } from './common'
import { UploadFile } from './file'
import { Post } from './post'
import { RecommendedTopic } from './recommended-topic'
import { RecommendedTweet } from './recommended-tweet'
import { Role } from './role'
import { SavedTweet } from './saved-tweet'
import { StrapiBase } from './strapi'
import { Timeline } from './timeline'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type UserBase = {
  email: string
  username: string
  blocked: boolean
  confirmed: boolean
  provider: string
}

type UserRelation = {
  role?: Role
  avatar?: UploadFile | null
  createdPosts?: Array<Post>
  applicant?: Applicant | null
  volunteer?: Volunteer | null
  votes?: Array<Vote>
  artist?: Artist | null
  likedArts?: Array<Art>
  likedBlogs?: Array<Blog>
  reviewedPosts?: Array<Post>
  listedTimelines?: Array<Timeline>
  recommendedTweets?: Array<RecommendedTweet>
  createdTimelines?: Array<Timeline>
  savedTweets?: Array<SavedTweet>
  comments?: Array<Comment>
  recommendedTopics?: Array<RecommendedTopic>
}

type UserRelationInput = {
  role: number
  avatar?: Blob
  createdPosts?: Array<number>
  applicant?: number
  volunteer?: number
  votes?: Array<number>
  artist?: number
  likedArts?: Array<number>
  likedBlogs?: Array<number>
  reviewedPosts?: Array<number>
  listedTimelines?: Array<number>
  recommendedTweets?: Array<number>
  createdTimelines?: Array<number>
  savedTweets?: Array<number>
  comments?: Array<number>
  recommendedTopics?: Array<number>
}

export type UpdateUserInput = Expand<
  Partial<Omit<UserBase, 'provider'> & UserRelationInput>
>

export type User = Expand<
  Omit<StrapiBase, 'publishedAt'> & UserBase & UserRelation
>
