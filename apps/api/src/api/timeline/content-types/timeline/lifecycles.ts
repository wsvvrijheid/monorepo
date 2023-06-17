import { getUserByUsername, getUserTweets } from '../../../../libs'

export default {
  async afterCreate({ result }) {
    try {
      const userResult = await getUserByUsername(result.username as string)

      const user = userResult?.data

      if (!user) return

      const tweets = (await getUserTweets(user.id, user)) || []

      await strapi.entityService.update('api::timeline.timeline', result.id, {
        data: {
          userData: {
            id: user.id,
            name: user.name,
            username: user.username,
            profile: user.profile_image_url,
          },
          tweets,
        },
      })
    } catch (error) {
      console.log('Error updating user tweet', error.message)
    }
  },
}
