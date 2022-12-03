import { twitterApi } from '../../../../libs/twitter/client'

export default {
  async afterCreate({ result }) {
    const user = await twitterApi.v1.user({
      screen_name: result.username as unknown as string,
    })

    strapi
      .service('api::mention.mention')
      .update(result.id, { data: { data: user } })
  },
}
