import { twitterApi } from '../../../../src/libs/twitter/client'

export default async ({ strapi }) => {
  try {
    const timelines = await strapi.controller('api::timeline.timeline').find({})

    if (!Array.isArray(timelines.data)) return
    if (!timelines.data[0]) return

    timelines.data.map(async ({ id, attributes }) => {
      const userData = await twitterApi.v1.user({
        screen_name: attributes.username,
      })

      const tweetsResponse = await twitterApi.v2.userTimeline(userData.id_str, {
        max_results: 50,
        expansions: ['attachments.media_keys'],
        'tweet.fields': ['created_at'],
        'media.fields': ['preview_image_url', 'url'],
        exclude: 'retweets',
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

      await strapi.service('api::timeline.timeline').update(id, {
        data: {
          userData: {
            name: userData.name,
            username: userData.screen_name,
            profile: userData.profile_image_url_https,
          },
          tweets,
        },
      })
    })
  } catch (error) {
    console.log(
      'Error updating timeline tweet',
      error?.response || error.message,
    )
  }
}
