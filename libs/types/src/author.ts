import { Blog } from './blog'
import { StrapiCollection, StrapiEntity } from './strapi'
import { Volunteer } from './volunteer'

export type Author = {
  id: number
  blogs: StrapiCollection<Blog>
  volunteer: StrapiEntity<Volunteer>
}
