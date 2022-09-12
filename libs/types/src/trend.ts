import { Expand, Localize } from './common'
import { StrapiCore } from './strapi'

export interface TwitterTrend {
  name: string
  url: string
  promoted_content: string | null
  query: string
  tweet_volume: number | null
}

export type Trend = Expand<StrapiCore & Localize<TwitterTrend[] | null>>
