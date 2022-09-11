import { Applicant } from './applicant'
import { Art } from './art'
import { Artist } from './artist'
import { Blog } from './blog'
import { Comment } from './comment'
import { UploadFile } from './file'
import { Post } from './post'
import { RecommendedTopic } from './recommended-topic'
import { RecommendedTweet } from './recommended-tweet'
import { Role } from './role'
import { SavedTweet } from './saved-tweet'
import { StrapiCore } from './strapi'
import { Timeline } from './timeline'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type User = {
  email: string
  username: string
  blocked: boolean
  confirmed: boolean
  provider: string
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
} & Omit<StrapiCore, 'publishedAt'>
