import { twitterApi } from '../../../../src/libs'

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

      const result = await twitterApi.v1.get('search/tweets.json', {
        q: `${attributes.hashtag} -filter:retweets`,
      })

      if (result && result.statuses) {
        const tweets = result.statuses
        const mappedTweets = tweets.map(data => {
          let image = undefined
          let videos = undefined

          const id = data.id_str
          const { name, screen_name, profile_image_url_https } = data.user
          const user = {
            name,
            username: screen_name,
            profile: profile_image_url_https,
          }
          const text = data.text
          const likes = data.favorite_count
          const retweets = data.retweet_count

          if (
            data &&
            data.extended_entities &&
            data.extended_entities.media &&
            data.extended_entities.media[0]
          ) {
            image = data.extended_entities.media[0].media_url_https
            videos =
              (data.extended_entities.media[0].video_info &&
                data.extended_entities.media[0].video_info.variants) ||
              undefined
          }

          return {
            id,
            user,
            text,
            image,
            videos,
            likes,
            retweets,
          }
        })

        await strapi
          .service('api::hashtag.hashtag')
          .update(id, { data: { tweets: mappedTweets } })
      }
    } catch (error) {
      console.error(
        `Error while searching tweets`,
        error?.response || error.message,
      )
    }
  })
}
