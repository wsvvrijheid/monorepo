import { TwitterApi } from 'twitter-api-v2'
import { twitterApi } from '../../../../libs/twitter/client'

export default {
  async beforeCreate(event) {
    // const { data } = event.params
    // FIXME
    // event.params.data.creator = data.createdBy
  },
  async afterCreate({ result }) {
    try {
      const userData = await twitterApi.v1.user({
        screen_name: result.username,
      })

      const tweetsResponse = await twitterApi.v2.userTimeline(userData.id_str, {
        expansions: ['attachments.media_keys'],
        'tweet.fields': ['created_at'],
        'media.fields': ['preview_image_url', 'url'],
      })

      const tweetsData = tweetsResponse?.data.data
      const includes = tweetsResponse?.data.includes

      const tweets = tweetsData?.map(
        ({ id, text, created_at, attachments }) => {
          let media = includes?.media?.find(
            media => media.media_key === attachments?.media_keys?.[0],
          )

          return {
            id,
            text,
            created_at,
            media,
          }
        },
      )

      await strapi
        .service('api::timeline.timeline')
        .update(result.id, { data: { userData, tweets } })
    } catch (error) {
      console.log('Error updating user tweet', error)
    }
  },
}
