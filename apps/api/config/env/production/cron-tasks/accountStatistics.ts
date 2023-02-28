import { twitterApi } from '../../../../src/libs/twitter/client'

export default async ({ strapi }) => {
  try {
    const accounts = await strapi
      .controller('api::account-statistic.account-statistic')
      .find({})
  
    if (!Array.isArray(accounts.data)) return
    if (!accounts.data[0]) return
    accounts.data.map(async ({ id, attributes }) => {
      const user = await twitterApi.v2.userByUsername(attributes.account, {
        'user.fields': 'public_metrics',
        'tweet.fields': 'public_metrics',
      })

      const followerCount = user.data.public_metrics.followers_count
      const tweetCount = user.data.public_metrics.tweet_count
      let likeCount = 0
      let retweetCount = 0

      const today = new Date()
      const pastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

      const isoDateString = pastWeek.toISOString()

      const test = await twitterApi.v2.userTimeline(user.data.id, {
        start_time: isoDateString,
        'tweet.fields': 'public_metrics',
      })
      test.data.data.forEach(item => {
        likeCount += item.public_metrics.like_count
        retweetCount += item.public_metrics.retweet_count
      })
      
      await strapi
        .service('api::account-statistic.account-statistic')
        .update(id, {
          data: {
            followers: followerCount,
            tweets: tweetCount,
            retweets: retweetCount,
            likes: likeCount,
          },
        })
    })
  } catch (error) {
    console.log(
      'Error updating account statistics',
      error?.response || error.message,
    )
  }
}
