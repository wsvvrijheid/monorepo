import { Activity } from './activity'
import { Announcement } from './announcement'
import { Art } from './art'
import { Blog } from './blog'
import { Competition } from './competition'
import { Hashtag } from './hashtag'
import { Mention } from './mention'
import { StrapiCore } from './strapi'

export type Category = {
  code: string
  name_en: string
  name_nl: string
  name_tr: string
  activities?: Array<Activity>
  announcements?: Array<Announcement>
  arts?: Array<Art>
  blogs?: Array<Blog>
  competitions?: Array<Competition>
  hashtags?: Array<Hashtag>
  mentions?: Array<Mention>
} & StrapiCore
