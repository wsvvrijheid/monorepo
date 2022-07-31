import { Applicant } from './applicant'
import { Art } from './art'
import { Artist } from './artist'
import { Blog } from './blog'
import { Comment } from './comment'
import { UploadFile } from './file'
import { Post } from './post'
import { Role } from './role'
import { StrapiCore } from './strapi'
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
  liked_arts?: Array<Art>
  liked_blogs?: Array<Blog>
  comments?: Array<Comment>
} & Omit<StrapiCore, 'publishedAt'>
