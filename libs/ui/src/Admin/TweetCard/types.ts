import { StrapiLocale, Tweet } from '@wsvvrijheid/types'

export type TweetBaseCardProps = {
  tweet: Tweet
  defaultLocale: StrapiLocale
  onSave: (tweet: Tweet) => void
  onEdit: (tweet: Tweet) => void
}
