import { Applicant } from './applicant'
import { Artist } from './artist'
import { Post } from './post'
import { Role } from './role'
import { StrapiCollection, StrapiEntity } from './strapi'
import { Volunteer } from './volunteer'
import { Vote } from './vote'

export type User = {
  id: number
  email: string
  username: string
  blocked: boolean
  confirmed: boolean
  provider: string
  createdAt: string
  updatedAt: string
  role: Role
  createdPosts?: StrapiCollection<Post>
  applicant?: StrapiEntity<Applicant>
  volunteer?: StrapiEntity<Volunteer>
  votes?: StrapiCollection<Vote>
  artist: StrapiEntity<Artist>
}
