import { UserV1 } from 'twitter-api-v2'

import { twitterApi } from '../../../../libs'

type MentionUserData = Pick<
  UserV1,
  | 'description'
  | 'followers_count'
  | 'friends_count'
  | 'id_str'
  | 'location'
  | 'name'
  | 'profile_image_url_https'
  | 'screen_name'
  | 'verified'
>

export default {
  async afterCreate({ result }) {
    try {
      const user = await twitterApi.v1.user({
        screen_name: result.username as unknown as string,
      })

      const {
        description,
        followers_count,
        friends_count,
        id_str,
        location,
        name,
        profile_image_url_https,
        screen_name,
        verified,
      } = user

      const data = {
        description,
        followers_count,
        friends_count,
        id_str,
        location,
        name,
        profile_image_url_https,
        screen_name,
        verified,
      } as MentionUserData

      strapi.service('api::mention.mention').update(result.id, {
        data: { data },
      })
    } catch (error) {
      console.error('Error after mention create', error.message)
    }
  },
}
