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

    const followers = user.data.public_metrics.followers_count
    const followings = user.data.public_metrics.following_count
    let tweets = 0
    let likes = 0
    let retweets = 0
    let replies = 0

    const start_time = formatIso(addDays(date, -totalDays))
    const end_time = formatIso(date)

    const timeline = await twitterApi.v2.userTimeline(user.data.id, {
      start_time,
      end_time,
      exclude: ['retweets', 'replies'],
      'tweet.fields': 'public_metrics',
    })

    if (!timeline.data?.data?.length) {
      timeline.data.data.forEach(item => {
        likes += item.public_metrics.like_count
        retweets += item.public_metrics.retweet_count
        replies += item.public_metrics.reply_count
        tweets += 1
      })
    }

    return {
      followers,
      followings,
      tweets,
      retweets,
      likes,
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
