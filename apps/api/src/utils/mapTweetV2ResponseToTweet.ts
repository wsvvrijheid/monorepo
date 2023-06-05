import { ApiV2Includes, TweetV2, UserV1 } from 'twitter-api-v2'

import { Tweet } from '../libs'

export const mapTweetV2ResponseToTweet = (
  tweetsData: TweetV2[],
  includes: ApiV2Includes,
  userData?: UserV1,
): Tweet[] =>
  tweetsData?.map(({ id, text, created_at, attachments, public_metrics }) => {
    const media = includes?.media?.find(
      media => media.media_key === attachments?.media_keys?.[0],
    )

    const video = media?.variants
      ?.filter(variant => variant.bit_rate)
      .sort((a, b) => (a.bit_rate || 0) - (b.bit_rate || 0))?.[0].url

    const image = media?.preview_image_url || media?.url
    const user = userData && {
      name: userData?.name,
      username: userData?.screen_name,
      profile: userData?.profile_image_url_https,
    }
    const likes = public_metrics.like_count
    const retweets = public_metrics.retweet_count
    const replies = public_metrics.reply_count
    const impressions = (public_metrics as any).impression_count

    return {
      id,
      text,
      createdAt: created_at,
      video,
      image,
      user,
      likes,
      retweets,
      replies,
      impressions,
    }
  })
