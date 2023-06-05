import { ApiV2Includes, TweetV1TimelineResult, UserV1 } from 'twitter-api-v2'

import { Tweet } from '../libs'

export const mapTweetV1ResponseToTweet = (
  tweetsData: TweetV1TimelineResult,
  userData?: UserV1,
): Tweet[] =>
  tweetsData?.map(
    ({
      id_str,
      text,
      full_text,
      created_at,
      entities,
      retweet_count,
      reply_count,
      favorite_count,
    }) => {
      const media = entities?.media?.[0]

      const video = media?.video_info?.variants
        ?.filter(variant => variant.bitrate)
        .sort((a, b) => (a.bitrate || 0) - (b.bitrate || 0))?.[0].url

      const image = media?.media_url_https
      const user = userData && {
        name: userData?.name,
        username: userData?.screen_name,
        profile: userData?.profile_image_url_https,
      }
      const likes = favorite_count
      const retweets = retweet_count
      const replies = reply_count

      return {
        id: id_str,
        text: full_text || text,
        createdAt: created_at,
        video,
        image,
        user,
        likes,
        retweets,
        replies,
        impressions: null,
      }
    },
  )
