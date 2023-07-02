import { UserV2 } from 'twitter-api-v2'

import { Timeline } from '@wsvvrijheid/types'

import { getTwitterClient, getUserTweets } from '../../src/libs'

export default async ({ strapi }) => {
  const locales = ['en', 'nl', 'tr']
  try {
    const timelinePromise = await Promise.all<Timeline>(
      locales.map(locale => {
        return strapi.entityService.findMany('api::timeline.timeline', {
          locale,
        })
      }),
    )

    const timelines = timelinePromise.flat()

    if (!Array.isArray(timelines)) return
    if (!timelines[0]) return

    const twitterClient = await getTwitterClient()

    timelines.map(async ({ id, username, userData }) => {
      let user: UserV2 = userData && {
        id: userData.id,
        name: userData.name,
        username: userData.username,
        profile_image_url: userData.profile,
      }

      if (!user) {
        const userResponse = await twitterClient.v2.userByUsername(
          username as unknown as string,
          {
            'user.fields': ['public_metrics', 'username', 'name'],
          },
        )

        if (userResponse?.data) {
          user = userResponse?.data
        }
      }

      if (!user) return

      const tweets =
        (await getUserTweets(user.id).catch(e => console.log(e))) || []

      await strapi.entityService.update('api::timeline.timeline', id, {
        data: { tweets },
      })
    })
  } catch (error) {
    console.log('Error updating timeline tweet', error.message)
  }
}
