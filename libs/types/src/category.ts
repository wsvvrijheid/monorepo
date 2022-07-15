import { RawActivity, Activity } from './activity'
import { Announcement, RawAnnouncement } from './announcement'
import { RawArt, Art } from './art'
import { Blog, RawBlog } from './blog'
import { Competition, RawCompetition } from './competition'
import { Hashtag, RawHashtag } from './hashtag'
import { Mention, RawMention } from './mention'
import { StrapiCollection, StrapiRawCollection } from './strapi'

export type RawCategory = {
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
  arts?: StrapiRawCollection<RawArt>
  blogs?: StrapiRawCollection<RawBlog>
  competitions?: StrapiRawCollection<RawCompetition>
  hashtags?: StrapiRawCollection<RawHashtag>
  mentions?: StrapiRawCollection<RawMention>
}

export type Category = {
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
  arts?: StrapiCollection<Art>
  blogs?: StrapiCollection<Blog>
  competitions?: StrapiCollection<Competition>
  hashtags?: StrapiCollection<Hashtag>
  mentions?: StrapiCollection<Mention>
}
