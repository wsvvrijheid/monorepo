import { SetRequired } from 'type-fest'

import { Expand } from './common'
import { StrapiCore } from './strapi'
import { User } from './user'

export type RecommendedTopicBase = {
  title: string
  description: string
  imageUrl: string
  link: string
  publisher: string
  date: string
  skipped: boolean
  posted: boolean
}

type RecommendedTopicRelation = {
  recommender?: User
}

type RecommendedTopicRelationInput = {
  recommender?: number
}

export type RecommendedTopicCreateInput = Expand<
  Omit<RecommendedTopicBase, 'skipped' | 'posted'> &
    SetRequired<RecommendedTopicRelationInput, 'recommender'>
>

export type RecommendedTopic = Expand<
  StrapiCore & RecommendedTopicBase & RecommendedTopicRelation
>
