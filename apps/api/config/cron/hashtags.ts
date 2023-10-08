import { addHours } from 'date-fns'

import { getTwitterClient } from '../../src/libs'
import { mapTweetResponseToTweet } from '../../src/utils'

export default async () => {
  // Consider server timezone
  const date = addHours(new Date(), -6)

  // TODO Check for tr locale
  const hashtags = await strapi.db.query('api::hashtag.hashtag').findMany({
    where: {
      $and: [
        { date: { $gt: date } },
        { date: { $lt: new Date() } },
        { locale: 'tr' },
      ],
    },
  })

  if (!hashtags?.length) return

  const twitterClient = await getTwitterClient()

  if (!twitterClient) return

  for await (const hashtag of hashtags) {
    try {
      const { id, hashtagDefault } = hashtag

      if (!hashtagDefault) continue

      const result = await twitterClient.v2.search({
        query: hashtagDefault as string,
        max_results: 20,
        expansions: ['attachments.media_keys', 'author_id'],
        'media.fields': ['url', 'preview_image_url', 'variants'],
        'tweet.fields': ['attachments', 'public_metrics'],
        'user.fields': ['name', 'username', 'profile_image_url'],
      })

      const tweets = mapTweetResponseToTweet(result?.data)

      if (tweets?.length) {
        const mappedTweets = tweets.map(data => {
          const id = data.id

          const user = {
            name: data.user.name,
            username: data.user.username,
            profile: data.user.profile,
          }
          const text = data.text
          const likes = data.likes
          const retweets = data.retweets

          return {
            id,
            user,
            text,
            image: data.image || null,
            video: data.video || null,
            likes,
            retweets,
          }
        })

        await strapi.entityService.update('api::hashtag.hashtag', id, {
          data: { tweets: mappedTweets },
        })

        strapi.log.info(
          `Hashtag ${hashtagDefault} tweets fetched: ${tweets?.length}}`,
        )
      }
    } catch (error) {
      console.error('Hashtag cron error', error)
    }
  }
}
