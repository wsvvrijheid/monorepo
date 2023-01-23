import { UserV1 } from 'twitter-api-v2'

import { Category } from './category'
import { Expand } from './common'
import { Hashtag } from './hashtag'
import { StrapiLocale } from './locale'
import { StrapiBase } from './strapi'

export type MentionUserData = Pick<
  UserV1,
  | 'id'
  | 'id_str'
  | 'name'
  | 'screen_name'
  | 'profile_image_url_https'
  | 'followers_count'
  | 'friends_count'
  | 'location'
  | 'verified'
>

export type MentionBase = {
  username: string
  // TODO Provide a better type for this
  // https://github.com/PLhery/node-twitter-api-v2 can give us a proper type
  data: MentionUserData
  locale: StrapiLocale
}

type MentionRelation = {
  categories?: Array<Category>
  hashtags?: Array<Hashtag>
}

type MentionRelationInput = {
  categories?: Array<number>
  hashtags: Array<number>
}

export type MentionCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<MentionBase, 'data'> &
    MentionRelationInput
>

export type Mention = StrapiBase & MentionBase & MentionRelation
