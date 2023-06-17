import { getTwitterClient } from '../../src/libs'
import { mapTweetResponseToTweet } from '../../src/utils'

export default async ({ strapi }) => {
  const date = new Date(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).toISOString()

  // TODO Check for tr locale
  const hashtags = await strapi.entityService.findMany('api::hashtag.hashtag', {
    date: { $gte: date },
  })

  if (!Array.isArray(hashtags)) return
  if (!hashtags[0]) return

  const twitterClient = await getTwitterClient()

  for (const hashtag of hashtags) {
    try {
      const { id, hashtagDefault } = hashtag

      const result = await twitterClient.v2.search({
        query: hashtagDefault as string,
        max_results: 50,
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
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}
