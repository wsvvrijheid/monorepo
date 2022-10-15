import { SetRequired } from 'type-fest'

import { Expand } from './common'
import { StrapiBase } from './strapi'
import { TopicBase } from './topic'
import { User } from './user'

export type RecommendedTopicBase = {
  skipped: boolean
  posted: boolean
} & TopicBase

type RecommendedTopicRelation = {
  recommender?: User
}

type RecommendedTopicRelationInput = {
  recommender?: number
}

export type RecommendedTopicCreateInput = Expand<
  { publishedAt?: string | null } & Omit<
    RecommendedTopicBase,
    'skipped' | 'posted'
  > &
    SetRequired<RecommendedTopicRelationInput, 'recommender'>
>

export type RecommendedTopic = StrapiBase &
  RecommendedTopicBase &
  RecommendedTopicRelation
