export interface TweetUserData {
  id: number
  url: string
  lang?: string | null
  name: string
  id_str: string
  status: {
    id: number
    geo?: string | null
    lang: string
    text: string
    place?: string | null
    id_str: string
    source: string
    entities: {
      urls: Array<{
        url: string
        indices: number[]
        display_url: string
        expanded_url: string
      }>
      symbols: any[]
      hashtags: any[]
      user_mentions: any[]
    }
    favorited: boolean
    full_text: string
    retweeted: boolean
    truncated: boolean
    created_at: string
    coordinates?: any | null
    contributors?: any | null
    display_text_range: number[]
    retweet_count: number
    favorite_count: number
    is_quote_status: boolean
    possibly_sensitive: boolean
    in_reply_to_user_id?: any
    in_reply_to_status_id?: any
    in_reply_to_screen_name?: any
    in_reply_to_user_id_str?: any
    in_reply_to_status_id_str?: any
  }
  entities: {
    url: {
      urls: Array<{
        url: string
        indices: number[]
        display_url: string
        expanded_url: string
      }>
    }
    description: {
      urls: Array<{
        url: string
        indices: number[]
        display_url: string
        expanded_url: string
      }>
    }
  }
  location: string
  verified: boolean
  following: boolean | null
  protected: boolean
  time_zone?: string | null
  created_at: string
  utc_offset?: string
  description: string
  geo_enabled: boolean
  screen_name: string
  listed_count: number
  friends_count: number
  is_translator: boolean
  notifications: boolean
  statuses_count: number
  default_profile: boolean
  followers_count: number
  translator_type: string
  favourites_count: number
  profile_image_url: string
  profile_banner_url: string
  profile_link_color: string
  profile_text_color: string
  follow_request_sent: boolean
  contributors_enabled: boolean
  has_extended_profile: boolean
  default_profile_image: boolean
  withheld_in_countries: string[]
  is_translation_enabled: boolean
  profile_background_tile: boolean
  profile_image_url_https: string
  profile_background_color: string
  profile_sidebar_fill_color: string
  profile_background_image_url: string
  profile_sidebar_border_color: string
  profile_use_background_image: boolean
  profile_background_image_url_https: string
}
