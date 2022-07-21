import { Activity } from './activity'
import { Announcement } from './announcement'
import { Application } from './application'
import { Art } from './art'
import { Blog } from './blog'
import { Post } from './post'
import { StrapiCollection } from './strapi'

export type Tag = {
  id: number
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  activities?: StrapiCollection<Activity>
  announcements?: StrapiCollection<Announcement>
  applications?: StrapiCollection<Application>
  arts?: StrapiCollection<Art>
  blogs?: StrapiCollection<Blog>
  posts?: StrapiCollection<Post>
}
