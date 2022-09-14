import { Blog } from './blog'
import { Expand } from './common'
import { StrapiBase } from './strapi'
import { Volunteer } from './volunteer'

type AuthorRelation = {
  blogs?: Array<Blog>
  volunteer?: Volunteer
}

type AuthorRelationInput = {
  blogs?: Array<number>
  volunteer: number
}

export type AuthorCreateInput = AuthorRelationInput

export type Author = Expand<StrapiBase & AuthorRelation>
