import { getUserTweets, twitterApi } from '../../../../libs'

export default {
  async afterCreate({ result }) {
    try {
      const userData = await twitterApi.v1.user({
        screen_name: result.username,
      })

      const tweets = await getUserTweets(userData.id_str)

      await strapi.service('api::timeline.timeline').update(result.id, {
        data: {
          userData: {
            name: userData.name,
            username: userData.screen_name,
            profile: userData.profile_image_url_https,
          },
          tweets,
        },
      })
    } catch (error) {
      console.log('Error updating user tweet', error.message)
    }
  },
}
