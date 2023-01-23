import { twitterApi } from '../../../../src/libs/twitter/client'
import { getUserTweets } from '../../../../src/libs/twitter/getUserTweets'

export default async ({ strapi }) => {
  try {
    const timelines = await strapi.controller('api::timeline.timeline').find({})

    if (!Array.isArray(timelines.data)) return
    if (!timelines.data[0]) return

    timelines.data.map(async ({ id, attributes }) => {
      const userData = await twitterApi.v1.user({
        screen_name: attributes.username,
      })

      const tweets = await getUserTweets(userData.id_str)

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
