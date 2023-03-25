import addDays from 'date-fns/addDays'
import format from 'date-fns/format'
import formatIso from 'date-fns/formatISO'
import { twitterApi } from './client'

export const getAccountStats = async (
  username: string,
  date = new Date(),
  totalDays = 7,
) => {
  try {
    const user = await twitterApi.v2.userByUsername(username, {
      'user.fields': 'public_metrics',
      'tweet.fields': 'public_metrics',
    })

    const followerCount = user.data.public_metrics.followers_count
    const followingCount = user.data.public_metrics.following_count
    let tweetCount = 0
    let likeCount = 0
    let retweetCount = 0
    let replies = 0

    const start_time = formatIso(addDays(date, -totalDays))
    const end_time = formatIso(date)

    const timeline = await twitterApi.v2.userTimeline(user.data.id, {
      start_time,
      end_time,
      exclude: ['retweets', 'replies'],
      'tweet.fields': 'public_metrics',
    })

    timeline.data.data.forEach(item => {
      likeCount += item.public_metrics.like_count
      retweetCount += item.public_metrics.retweet_count
      replies += item.public_metrics.reply_count
      tweetCount += 1
    })

    return {
      followers: followerCount,
      followings: followingCount,
      tweets: tweetCount,
      retweets: retweetCount,
      likes: likeCount,
      replies,
      username,
    }
  } catch (error) {
    console.log(
      'Error getting account statistics',
      error?.response || error.message,
    )

    return null
  }
}
