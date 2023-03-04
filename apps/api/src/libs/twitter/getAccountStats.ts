import { writeFileSync } from 'fs'
import { twitterApi } from './client'

export const getAccountStats = async (username: string, days = 7) => {
  try {
    const user = await twitterApi.v2.userByUsername(username, {
      'user.fields': 'public_metrics',
      'tweet.fields': 'public_metrics',
    })

    writeFileSync('user.json', JSON.stringify(user, null, 2))

    const followerCount = user.data.public_metrics.followers_count
    const followingCount = user.data.public_metrics.following_count
    const tweetCount = user.data.public_metrics.tweet_count
    let likeCount = 0
    let retweetCount = 0
    let replies = 0

    const today = new Date()
    const pastWeek = new Date(today.getTime() - days * 24 * 60 * 60 * 1000)

    const isoDateString = pastWeek.toISOString()

    const timeline = await twitterApi.v2.userTimeline(user.data.id, {
      start_time: isoDateString,
      exclude: ['retweets', 'replies'],
      'tweet.fields': 'public_metrics',
    })

    timeline.data.data.forEach(item => {
      likeCount += item.public_metrics.like_count
      retweetCount += item.public_metrics.retweet_count
      replies += item.public_metrics.reply_count
    })

    return {
      followers: followerCount,
      followings: followingCount,
      tweets: tweetCount,
      retweets: retweetCount,
      likes: likeCount,
      date: new Date(today.getTime()).toLocaleDateString(),
      replies: replies,
      username: username,
    }
  } catch (error) {
    console.log(
      'Error getting account statistics',
      error?.response || error.message,
    )
  }
}
