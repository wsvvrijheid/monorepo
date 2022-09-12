import { Blog } from './blog'
import { Expand } from './common'
import { StrapiCore } from './strapi'
import { Volunteer } from './volunteer'

type AuthorRelation = {
  blogs?: Array<Blog>
  volunteer?: Volunteer
}

type AuthorRelationInput = {
  blogs?: number[]
  volunteer: number
}

export type AuthorCreateInput = AuthorRelationInput

export type Author = Expand<StrapiCore & AuthorRelation>
