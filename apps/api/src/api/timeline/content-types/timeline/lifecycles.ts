import { getUserTweets, twitterApi } from '../../../../libs'

export default {
  async afterCreate({ result }) {
    try {
      const userResult = await twitterApi.v2.userByUsername(
        result.username as unknown as string,
        {
          'user.fields': [
            'public_metrics',
            'profile_image_url',
            'location',
            'verified',
            'description',
          ],
        },
      )

      const user = userResult?.data

      if (!user) return

      const tweets = (await getUserTweets(user.id)) || []

      await strapi.service('api::timeline.timeline').update(result.id, {
        data: {
          userData: {
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
