import { UserV1 } from 'twitter-api-v2'
import { twitterApi } from '../../../../libs/twitter/client'

type MentionUserData = Pick<
  UserV1,
  | 'id_str'
  | 'name'
  | 'screen_name'
  | 'profile_image_url_https'
  | 'followers_count'
  | 'friends_count'
  | 'location'
  | 'verified'
>

export default {
  async afterCreate({ result }) {
    const user = await twitterApi.v1.user({
      screen_name: result.username as unknown as string,
    })

    const {
      name,
      screen_name,
      profile_image_url_https,
      followers_count,
      friends_count,
      location,
      verified,
      id_str,
    } = user

    const data = {
      name,
      screen_name,
      profile_image_url_https,
      followers_count,
      friends_count,
      location,
      verified,
      id_str,
    } as MentionUserData

    strapi.service('api::mention.mention').update(result.id, {
      data: { data },
    })
  },
}
