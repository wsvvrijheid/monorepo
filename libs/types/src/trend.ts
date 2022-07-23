import { StrapiCore } from './strapi'

export interface TwitterTrend {
  name: string
  url: string
  promoted_content: string | null
  query: string
  tweet_volume: number | null
}

export type Trend = {
  en: TwitterTrend[] | null
  nl: TwitterTrend[] | null
  tr: TwitterTrend[] | null
} & StrapiCore
