import { Activity } from './activity'
import { Announcement } from './announcement'
import { Art } from './art'
import { Blog } from './blog'
import { Expand } from './common'
import { Competition } from './competition'
import { Hashtag } from './hashtag'
import { Mention } from './mention'
import { StrapiBase } from './strapi'

type CategoryBase = {
  slug: string
  name_en: string
  name_nl: string
  name_tr: string
}

type CategoryRelation = {
  activities?: Array<Activity>
  announcements?: Array<Announcement>
  arts?: Array<Art>
  blogs?: Array<Blog>
  competitions?: Array<Competition>
  hashtags?: Array<Hashtag>
  mentions?: Array<Mention>
}

type CategoryRelationInput = {
  activities?: Array<number>
  announcements?: Array<number>
  arts?: Array<number>
  blogs?: Array<number>
  competitions?: Array<number>
  hashtags?: Array<number>
  mentions?: Array<number>
}

export type CategoryCreateInput = Expand<CategoryBase & CategoryRelationInput>

export type Category = StrapiBase & CategoryBase & CategoryRelation
