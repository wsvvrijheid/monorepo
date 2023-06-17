import { UserV1, UserV2 } from 'twitter-api-v2'

import { MentionUserData } from '@wsvvrijheid/types'

import { twitterApiBearer } from '../../../../libs'

export default {
  async afterCreate({ result }) {
    try {
      const userResult = await twitterApiBearer.v2.userByUsername(
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

      const {
        description,
        username,
        public_metrics: { followers_count, following_count: friends_count },
        id,
        location,
        name,
        profile_image_url,
        verified,
      } = user

      const data = {
        description,
        followers_count,
        friends_count,
        id_str: `${id}`,
        location,
        name,
        profile_image_url_https: profile_image_url,
        screen_name: username,
        verified,
      } as MentionUserData

      strapi.entityService.update('api::mention.mention', result.id, {
        data: { data },
      })
    } catch (error) {
      console.error('Error after mention create', error.message)
    }
  },
}
