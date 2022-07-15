import { Activity, RawActivity } from './activity'
import { Announcement, RawAnnouncement } from './announcement'
import { Application, RawApplication } from './application'
import { Art, RawArt } from './art'
import { Blog, RawBlog } from './blog'
import { Post, RawPost } from './post'
import { StrapiCollection, StrapiRawCollection } from './strapi'

export type RawTag = {
  id: number
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  activities?: StrapiRawCollection<RawActivity>
  announcements?: StrapiRawCollection<RawAnnouncement>
  applications?: StrapiRawCollection<RawApplication>
  arts?: StrapiRawCollection<RawArt>
  blogs?: StrapiRawCollection<RawBlog>
  posts?: StrapiRawCollection<RawPost>
}

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
