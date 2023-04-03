import { UserV1 } from 'twitter-api-v2'
import { mapTweetResponseToTweet } from '../../utils'
import { twitterApi } from './client'
import { Tweet } from './types'

export const getUserTweets = async (
  userId: string,
  userData?: UserV1,
): Promise<Tweet[]> => {
  const user: UserV1 = userData

  // if (!user) {
  //   user = await twitterApi.v1.user({ user_id: userId })
  // }

  try {
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
  } catch (error) {
    console.error('Error getting user tweets', error.message)
    return []
  }
}
