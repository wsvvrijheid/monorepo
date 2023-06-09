import { getUserTweets, twitterApi } from '../../../../src/libs'

export default async ({ strapi }) => {
  try {
    const timelines = await strapi.service('api::timeline.timeline').find({})

    if (!Array.isArray(timelines.data)) return
    if (!timelines.data[0]) return

    timelines.data.map(async ({ id, attributes }) => {
      const userResponse = await twitterApi.v2.userByUsername(
        attributes.username as unknown as string,
        {
          'user.fields': ['public_metrics', 'username', 'name'],
        },
      )

      const userData = userResponse?.data

      if (!userData) return

      // const tweets =
      //   (await getUserTweets(userData.id).catch(e => console.log(e))) || []

      await strapi.service('api::timeline.timeline').update(id, {
        data: {
          userData: {
            name: userData.name,
            username: userData.username,
            profile: userData.profile_image_url,
          },
          tweets: [],
        },
      })
    })
  } catch (error) {
    console.log('Error updating timeline tweet', error.message)
  }
}
