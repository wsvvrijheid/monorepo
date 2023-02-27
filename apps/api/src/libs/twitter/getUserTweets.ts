import { ApiV2Includes, TweetV2, UserV1 } from 'twitter-api-v2'
import { twitterApi } from './client'

export interface Tweet {
  id: string
  user: {
    name: string
    username: string
    profile: string
  }
  image?: string
  video?: string
  text: string
  createdAt: string
  likes: number
  retweets: number
}

export const mapTweetResponseToTweet = (
  tweetsData: TweetV2[],
  includes: ApiV2Includes,
  userData?: UserV1,
) =>
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

export const getUserTweets = async (
  userId: string,
  userData?: UserV1,
): Promise<Tweet[]> => {
  let user: UserV1 = userData

  // if (!user) {
  //   user = await twitterApi.v1.user({ user_id: userId })
  // }

  const tweetsResponse = await twitterApi.v2.userTimeline(userId, {
    max_results: 50,
    expansions: ['attachments.media_keys'],
    'tweet.fields': ['created_at', 'public_metrics'],
    'media.fields': ['preview_image_url', 'url', 'media_key', 'variants'],
    exclude: 'retweets',
  })

  const tweetsData = tweetsResponse?.data.data
  const includes = tweetsResponse?.data.includes

  const tweets: Tweet[] = mapTweetResponseToTweet(tweetsData, includes, user)

  return tweets
}
