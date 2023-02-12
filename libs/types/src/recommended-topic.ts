import { Expand } from './common'
import { StrapiBase, StrapiCreatorRelation } from './strapi'
import { TopicBase } from './topic'

export type RecommendedTopicBase = {
  skipped: boolean
  posted: boolean
} & Omit<TopicBase, 'isRecommended'>

export type RecommendedTopicCreateInput = Expand<
  { publishedAt?: Date | string | null } & Omit<
    RecommendedTopicBase,
    'skipped' | 'posted'
  > & { token: string }
>

export type RecommendedTopic = StrapiBase &
  RecommendedTopicBase &
  StrapiCreatorRelation
