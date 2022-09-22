import { Expand, Localize } from './common'
import { StrapiBase } from './strapi'

export interface TwitterTrend {
  name: string
  url: string
  promoted_content: string | null
  query: string
  tweet_volume: number | null
}

export type Trend = Expand<StrapiBase & Localize<TwitterTrend[] | null>>
