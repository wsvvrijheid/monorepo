import { UserV1 } from 'twitter-api-v2'

import { twitterApi } from './client'
import { Tweet } from './types'
import { mapTweetV1ResponseToTweet } from '../../utils'

export const getUserTweets = async (
  userId: string,
  userData?: UserV1,
): Promise<Tweet[]> => {
  const user: UserV1 = userData

  // if (!user) {
  //   user = await twitterApi.v1.user({ user_id: userId })
  // }

  try {
    const tweetsResponse = await twitterApi.v1.userTimeline(userId, {
      count: 50,
      include_rts: false,
      exclude_replies: true,
      tweet_mode: 'extended',
    })

    const tweetsData = tweetsResponse?.data

    const tweets: Tweet[] = mapTweetV1ResponseToTweet(tweetsData, user)

    return tweets
  } catch (error) {
    console.error('Error getting user tweets', error.message)

    return []
  }
}
