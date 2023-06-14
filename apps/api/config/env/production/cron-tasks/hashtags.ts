import { twitterApi } from '../../../../src/libs'
import { mapTweetV2ResponseToTweet } from '../../../../src/utils'

export default async ({ strapi }) => {
  const date = new Date(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).toISOString()

  // TODO Check for tr locale
  const hashtags = await strapi.service('api::hashtag.hashtag').find({
    date: { $gte: date },
  })

  if (!Array.isArray(hashtags.data)) return
  if (!hashtags.data[0]) return

  hashtags.data.map(async h => {
    try {
      const { id, attributes } = h

      const result = await twitterApi.v2.search({
        query: attributes.hashtagDefault as string,
        max_results: 50,
        expansions: ['attachments.media_keys'],
        'media.fields': ['url', 'preview_image_url', 'variants'],
        'tweet.fields': ['attachments'],
      })

      const tweetsData = result?.data.data
      const includes = result?.data.includes

      const tweets = mapTweetV2ResponseToTweet(tweetsData, includes)

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
            videos: data.video || null,
            likes,
            retweets,
          }
        })

        await strapi
          .service('api::hashtag.hashtag')
          .update(id, { data: { tweets: mappedTweets } })
      }
    } catch (error) {
      console.error(`Error while searching tweets`, error.message)
    }
  })
}
