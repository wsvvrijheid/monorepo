import { Blog, RawBlog } from './blog'
import { RawVolunteer, Volunteer } from './volunteer'
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi'

export type RawAuthor = {
  id: number
  blogs: StrapiRawCollection<RawBlog>
  volunteer: StrapiRawEntity<RawVolunteer>
}

export type Author = {
  id: number
  blogs: StrapiCollection<Blog>
  volunteer: StrapiEntity<Volunteer>
}
