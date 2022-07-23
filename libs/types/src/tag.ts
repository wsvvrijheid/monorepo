import { Activity } from './activity'
import { Announcement } from './announcement'
import { Application } from './application'
import { Art } from './art'
import { Blog } from './blog'
import { Post } from './post'
import { StrapiCore } from './strapi'

export type Tag = {
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  activities?: Array<Activity>
  announcements?: Array<Announcement>
  applications?: Array<Application>
  arts?: Array<Art>
  blogs?: Array<Blog>
  posts?: Array<Post>
} & StrapiCore
