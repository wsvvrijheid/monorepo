import { StrapiLocale } from '@wsvvrijheid/types'
import { ReactNode } from 'react'
import { Tweet } from '../../../../types/src/tweet'

export type TweetBaseCardProps = {
  tweet: Tweet
  defaultLocale: StrapiLocale
  options: ReactNode
}
