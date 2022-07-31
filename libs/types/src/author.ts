import { Blog } from './blog'
import { StrapiCore } from './strapi'
import { Volunteer } from './volunteer'

export type Author = {
  blogs?: Array<Blog>
  volunteer?: Volunteer
} & StrapiCore
